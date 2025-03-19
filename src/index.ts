import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;

wss.on("connection", (socket) => {
  userCount += 1;
  console.log(userCount);

  socket.on("message", (message) => {
    console.log("message " + message.toString());
  });
});
