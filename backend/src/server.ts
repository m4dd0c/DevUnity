import { app } from "./app";
import http from "http";
import SocketService from "./SocketService/SockectService";

const server = http.createServer(app);
const socketService = new SocketService(server);
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("Listening on port", port);
});

socketService.connect();
