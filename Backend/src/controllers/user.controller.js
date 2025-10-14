import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { uploadonCloudinary } from '../utils/cloudinary.js'
import { Question } from '../models/question.model.js'
import { Answer } from '../models/answer.model.js'

// Controller for registering a User and storing its details in database
const registerUser = AsyncHandler(async(req, res)=>{
    // Check whether the required items are there in the request sent by the frontend otherwise throwing an error
    const {fullname, email, password} = req.body
    if(!fullname || !email || !password){
        throw new ApiError(400, "All Fields are required!")
    }

    // Validate user to be unique by searching by its email in the database. If found throw an error
    const user =await User.findOne({email})
    if(user) 
        throw new ApiError(400, "User already exists")
    
    // Check for the required profileImg file other wise throw an error
    // if(!req.file){
    //     throw new ApiError(400, "Profile Image is required")
    // }

    // Store the profileImg's local path in the server as it was uploaded on the server by multer middleware
    // const profileImgPath = req.file.buffer

    // Upload the profileImg on cloudinary which is a third party app for media storage and it also deletes the locally uploaded file in either cases of success or failure. If failed then throw an error.
    // const profileImg = await uploadonCloudinary(profileImgPath)
    // if(!profileImg){
    //     throw new ApiError(400, "Something went wrong while uploading profile image")
    // }

    // Create a new user in the database using the given data.
    const newUser =await User.create({
        fullname,
        email,
        password,
        // profileImg: profileImg.url,
    })

    // Get the data from the database and store it in a new variable so as to send it in response. if not found that means it is not created and hence throw an error
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating a User!")
    }

    // return the response for the request (Don't forget to write return as the process should return something)
    return res
    .status(201)
    .json(
        new ApiResponse(201,createdUser, "User created Successfully!!")
    )
})

// loginUser controller
const loginUser = AsyncHandler(async(req, res)=>{
    // Extract the data required for login and check for empty fields
    const {email, password} = req.body
    if(!email || !password){
        throw new ApiError(400, "All Fields are required!")
    }

    // Check for user and if not found throw an error
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400, "User does not exist. Register first")
    }
    // verify password and if not matched throw an error
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(400,"User credentials are incorrect")
    }
    // generate refresh and access token and store it in the db
    
    try {
        const refreshToken = await user.generateRefreshToken()
        const accessToken = await user.generateAccessToken()
        user.refreshToken = refreshToken
        user.accessToken = accessToken
        await user.save({validateBeforeSave: false})
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating token")
    }
    const loggedInUser = await User.findById(user._id).select("-password ")
    if(!loggedInUser){
        throw new ApiError(500, "Something went wrong while fetching user details")
    }

    const options={
        httpOnly: true,
        secure: true
    }
    // return a response
    return res
    .status(201)
    .cookie("accessToken", user.accessToken, options)
    .cookie("refreshToken", user.refreshToken, options)
    .json(
        new ApiResponse(201, 
            {
                user: loggedInUser,
                accessToken: user.accessToken
            }
            , "User Logged in successfully")
    )
})
// Profile controller
const getProfile = AsyncHandler(async(req, res)=>{
    const user = req.user
    if(!user){
        throw new ApiError(500,"User not found")
    }
    return res
    .status(201)
    .json(
        new ApiResponse(201, 
            {
                user: user,
            }
            , "User profile fetched successfully!")
    )
})

const logoutUser = AsyncHandler(async(req,res)=>{
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true,
        },
    )
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out successfully!!")
    )
})

const refreshAccessToken = AsyncHandler(async(req,res)=>{
    const refreshToken = req.user.refreshAccessToken
    if(!refreshAccessToken){
        throw new ApiError(400,"RefreshToken not found!")
    }
    const user = await User.findById(req.user._id)
    if(!user){
        throw new ApiError(500, "Something went wrong while fetching the user")
    }
    if(!(user.refreshToken == refreshToken)){
        throw new ApiError(400, "Invalid RefreshToken")
    }
    try {
        const newRefreshToken = await user.generateRefreshToken()
        const accessToken = await user.generateAccessToken()
        user.refreshToken = newRefreshToken
        user.accessToken = accessToken
        await user.save({validateBeforeSave: true})
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating token")
    }

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(201)
    .cookie("accessToken", user.accessToken, options)
    .cookie("refreshToken", user.refreshToken, options)
    .json(
        new ApiResponse(201, req.user, )
    )
})

const answer = AsyncHandler(async(req,res)=>{
    const answer = req.body.answer
    const userId = req.user._id
    const queId = req.query.id
    if(!userId || !queId){
        throw new ApiError(400, "All fields are required")
    }
    if(!answer){
        throw new ApiError(400, "Answer can't be empty")
    }
    let newAnswer
   try {
    newAnswer = new Answer({
        answeredBy: userId,
        question: queId,
        answer
    })
    const que = await Question.findById(queId)
    if(!que){
        throw new ApiError(404, "Question not found!")
    }
    que.answers.push(newAnswer._id)
    await que.save({validateBeforeSave: false})
   } catch (error) {
    throw  new ApiError(500, "Something went wrong while posting the answer")
   }

   return res
   .status(201)
   .json(
    new ApiResponse(201, newAnswer, "answer posted successfully")
   )

})

// const comment = AsyncHandler(async(req,res)=>{
    
// })
// Exporting all the user controllers
export {registerUser, loginUser,getProfile, logoutUser, refreshAccessToken, answer}