import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { setupRoutes } from "./routes";
import error from "./middleware/error";

const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
};
export const app = express();

// @ts-ignore
app.use(express.json({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());

setupRoutes();

app.get("/", (req, res) => {
  res.send("Server is working...");
});
app.use(error);
