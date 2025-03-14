import mongoose from 'mongoose'

const connectToDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database successfully connected");       
    } catch (error) {
        console.log("Mongodb connection error:", err);
        process.exit(1);
    }
}

export default connectToDB