import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Creating a schema for storing some information in database with the help of mongoose. Schema could be thought of as a format to store data with some restrictions determined by us. 
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
    },
    // By setting timestamps to true, database would automatically store createdAt and updatedAt field in db.
    {timestamps: true}
)

// .pre() is a middleware used just before storing the data to database. it can be used in various ways either async await or by returning promise or as a simple function. It is called after .save() middleware is used. Since .save is a document middleware, this refers to the model. 
// This functions check if the model's password is modified or not. If not then carry out the rest of the code otherwise hash the password using bcrypt.
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Different methods that can be used for the model User.
// userSchema.methods.hashPassword = async function (password){
//     return await bcrypt.hash(password,10)
        
// }
// Is password Correct checks the password by comparing the first argument which is not encrypted with the encrypted version of the data which is taken as the second argument. It returns either true or false.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// Generates Refresh Token
// Jwt ( Jsonwebtoken ) takes three things as argument (payload, secret, options or callback). variety of syntax is given on the github page of jwt
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

// Generates Access Token
// Jwt ( Jsonwebtoken ) takes three things as argument (payload, secret, options or callback). variety of syntax is given on the github page of jwt
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

// Exporting the model 
export const User = mongoose.model("User", userSchema)