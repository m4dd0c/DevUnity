import { app } from "./app";
import http from "http";
import SocketService from "./SocketService/SockectService";
import cloudinary from "cloudinary";
import { connectDB } from "./config/connectDB";
import "dotenv/config";

connectDB();
// cloudinary setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = http.createServer(app);
const socketService = new SocketService(server);
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("Listening on port", port);
});

socketService.connect();
