import mongoose from 'mongoose'

// Function for connecting to database using mongoose
const connectToDB = async() =>{
    try {
        // Mongoose provides .connect() to connect to database. It requires uri and some options as argument which can be found in their documentation 
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database successfully connected");       
    } catch (error) {
        console.log("Mongodb connection error:", err);
        // process.exit() is used to forcefully stop all the synchronously assigned tasks and exit the code asap. Node generally exits the process using the code 0 which is a success code and nonzero code means failure.
        process.exit(1);
    }
}

// Exporting the function in order to use it in the index.js which is the entry point of the backend code.
export default connectToDB