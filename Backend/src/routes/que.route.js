import express from 'express'
import { getAllQuestions, getQuestion } from "../controllers/que.controller.js"
const router = express.Router()

router.route('/question').get(
    getQuestion
)

router.route('/questions').get(getAllQuestions)

export default router