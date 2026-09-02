import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';

configDotenv();

// Connect the existing db or create & connect if the "first-db" doesnt exists.
export async function connectDB() {
    await mongoose.connect( process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
}