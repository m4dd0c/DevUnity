import { Schema, model } from "mongoose";

const errorSchema = new Schema(
  {
    message: {
      type: String,
      default: "Internal Server Error",
    },
    stack: {
      type: String,
    },
    status: {
      type: Number,
      default: 500,
    },
  },
  { timestamps: true, capped: { size: 100, autoIndexId: true, max: 50 } },
);
const ErrorLogs = model("ErrorLogs", errorSchema);
export default ErrorLogs;
