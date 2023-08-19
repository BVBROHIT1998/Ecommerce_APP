import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to Mongo DAtabse${conn.connection.host}`)

    } catch (error) {
        console.log(`Error in Mongodb${error}`)
    }
}


export default connectDB;