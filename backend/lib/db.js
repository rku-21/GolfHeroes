import mongoose  from "mongoose";

export const connectDB = async () => {
    try {
        console.log("MONGO URI EXISTS:", !!process.env.MONGODB_URI);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch(error) {
    console.error("MongoDB Error:", error);
    throw error;
}
}