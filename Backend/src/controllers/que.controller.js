import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { Question } from "../models/question.model.js";
import { User } from '../models/user.model.js';

const uploadQuestion = AsyncHandler(async(req,res)=>{
    const {userId, title, description, labels} = req.body
    if(!userId || !title || !description){
        throw new ApiError(400, "Please fill the mandatory fields")
    }
    const user = await User.findById(userId)
    if(!user){
        throw new ApiError("Invalid userId")
    }
    const que = await Question.create({
        createdBy: user,
        title,
        description,
        categories: labels
    })

    const createdQue = await Question.findById(que._id)
    if(!createdQue){
        throw new ApiError(500, "Something went wrong while creating the que")
    }
    return res
    .status(201)
    .json(
        new ApiResponse(201,createdQue, "Que created Successfully!!")
    )
})

const getQuestion = AsyncHandler(async(req, res)=>{
    const queId = req.query.id
    const que = await Question.findById(queId)
    if(!que){
        throw new ApiError(400, "que not found")
    }
    return res
    .status(201)
    .json(
        new ApiResponse(201,que, "Que fetched Successfully!!")
    )
})

const getAllQuestions = AsyncHandler(async(req,res)=>{
    const ques = await Question.find().limit(10)
    if(!ques){
        throw new ApiError(500, "There was an issue fetching the details")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201,ques, "All Ques fetched Successfully!!")
    )
})

export {uploadQuestion, getQuestion,getAllQuestions}