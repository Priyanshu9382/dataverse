import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'
import jwt from 'jsonwebtoken'

export const verifyJwt = AsyncHandler(async(req, _, next)=>{
    try {
        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401, "Unauthorised req")
        }
        const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select('-password -refreshToken')
        if(!user){
            throw new ApiError(401, "Invalid access token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid AccessToken")
    }
})

