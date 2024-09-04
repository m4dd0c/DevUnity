import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) return false;
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "DevUnity",
    });
    console.log("Connected to DB!");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
