import mongoose from "mongoose";

let isConnected = false; // Global cache to prevent re-connection on every call

export const connectToDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "customPizzaApp",
    });

    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};