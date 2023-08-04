import express from "express";
import http from "http";
import { Server as IO } from "socket.io";
/**
 * 初始化 express
 * @param app
 * @returns
 */
export default function initApp() {
  let app = express();
  let http_server = http.createServer(app);
  http_server.listen(80);
  
  let io = new IO(http_server, {
    path: "/",
    cors: {
      origin: "*"
    }
  });
  http_server.on("listening", () => {
    let addr = http_server.address();
    if (addr) {
      let port = typeof addr === "string" ? addr : addr.port;
      console.log(`Listening on ${port}`);
    }
  });
  return io;
}
