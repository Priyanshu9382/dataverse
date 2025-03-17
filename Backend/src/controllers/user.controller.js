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
    const profileImgPath = req.file.path

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


// Exporting all the user controllers
export {registerUser}