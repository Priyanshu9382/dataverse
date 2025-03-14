import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            lowercase: true,
            min: [3, "Fullname must be at least 3 characters long"]
        },
        about: {
            type: String,
            required: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password:{
            type: String,
            required: true,
        },
        profileImg: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            default: ""
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question"
            }
        ]
    },{timestamps: true}
)

export const User = mongoose.model("User", userSchema)