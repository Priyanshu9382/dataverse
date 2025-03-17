import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

// Middlewares are included using .use()
// cors is helpful if the backend and frontend are hosted on different ports. it abbreviates as cross origin resource sharing. the origin helps to set which server to allow request from.
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))

// .json() converts the request in a by default json format. limit option helps in setting the size of req.
app.use(express.json({limit: "16kb"}))
// .urlencoded() : in this if extended is set false which is the default value, it only allows the value which is either string or array but by setting it to true it allows all types of value.
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// .static() helps in serving static files
app.use(express.static("public"))
// cookieParser helps to manage cookies.
app.use(cookieParser())

// Router is imported in this app 
import userRouter from './routes/user.route.js'
app.use("/api/v1/user", userRouter) // here it is set that if '/api/v1/user' is hit then the userRouter is given the control to carry out the further routing.


export {app}