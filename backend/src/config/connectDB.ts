import mongoose from "mongoose";
let mongoClient: typeof mongoose | null = null;
export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI ?? "mongodb://0.0.0.0:27017/";
    mongoClient = await mongoose.connect(MONGO_URI, {
      dbName: "DevUnity",
    });
    console.log("Connected to DB!");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
export { mongoClient };
