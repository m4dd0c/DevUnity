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

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());

setupRoutes();

app.use(error);
