import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
        },
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Answer",
            }
        ],
        categories: [
            {
                type: String,
                default: []
            }
        ],
        upvote: {
            type: Number,
            default: 0
        }
    }, {timestamps: true}
)

export const Question = mongoose.model("Question", questionSchema)