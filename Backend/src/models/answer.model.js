import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema(
    {
        answeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        likes: {
            type: Number,
            default: 0
        }
    }, {timestamps: true}
)

export const Answer = mongoose.model("Answer", answerSchema)