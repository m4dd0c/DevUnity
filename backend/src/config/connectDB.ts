import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb://0.0.0.0/27017", {
      dbName: "Collabrite",
    });
    console.log("Connect to DB!");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
