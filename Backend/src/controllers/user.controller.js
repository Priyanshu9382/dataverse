import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { uploadonCloudinary } from '../utils/cloudinary.js'

// Controller for registering a User and storing its details in database
const registerUser = AsyncHandler(async(req, res)=>{
    // Check whether the required items are there in the request sent by the frontend otherwise throwing an error
    const {fullname,about, email, password} = req.body
    if(!fullname || !about || !email || !password){
        throw new ApiError(400, "All Fields are required!")
    }

    // Validate user to be unique by searching by its email in the database. If found throw an error
    const user =await User.findOne({email})
    if(user) 
        throw new ApiError(400, "User already exists")
    
    // Check for the required profileImg file other wise throw an error
    if(!req.file){
        throw new ApiError(400, "Profile Image is required")
    }

    // Store the profileImg's local path in the server as it was uploaded on the server by multer middleware
    const profileImgPath = req.file.buffer

    // Upload the profileImg on cloudinary which is a third party app for media storage and it also deletes the locally uploaded file in either cases of success or failure. If failed then throw an error.
    const profileImg = await uploadonCloudinary(profileImgPath)
    if(!profileImg){
        throw new ApiError(400, "Something went wrong while uploading profile image")
    }

    // Create a new user in the database using the given data.
    const newUser =await User.create({
        fullname,
        about,
        email,
        password,
        profileImg: profileImg.url,
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
    
})
// Exporting all the user controllers
export {registerUser, loginUser}