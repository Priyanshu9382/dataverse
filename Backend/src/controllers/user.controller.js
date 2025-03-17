import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { uploadonCloudinary } from '../utils/cloudinary.js'
const registerUser = AsyncHandler(async(req, res)=>{
    const {fullname,about, email, password} = req.body
    if(!fullname || !about || !email || !password){
        throw new ApiError(400, "All Fields are required!")
    }
    const user =await User.findOne({email})
    if(user) 
        throw new ApiError(400, "User already exists")
    
    if(!req.file){
        throw new ApiError(400, "Profile Image is required")
    }
    const profileImgPath = req.file.path

    const profileImg = await uploadonCloudinary(profileImgPath)
    if(!profileImg){
        throw new ApiError(400, "Something went wrong while uploading profile image")
    }
    const newUser =await User.create({
        fullname,
        about,
        email,
        password,
        profileImg: profileImg.url,
    })
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating a User!")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201,createdUser, "User created Successfully!!")
    )
})

export {registerUser}