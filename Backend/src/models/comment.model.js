import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
    {
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        answer: {
            type: String,
            required: true
        },
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
        depth: {
            type: Number,
            default: 0
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
    }
)

export const Comment = mongoose.model("Comment", commentSchema)