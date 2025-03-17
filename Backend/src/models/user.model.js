import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
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

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.hashPassword = async function (password){
    return await bcrypt.hash(password,10)
        
}
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = async function(){
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
        }, process.envv.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateAccessToken = async function(){
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
        }, process.envv.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)