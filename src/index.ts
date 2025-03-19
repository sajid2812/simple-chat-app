import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);

  socket.on("message", (message) => {
    console.log("message received" + message.toString());
    for (let i = 0; i < allSockets.length; i++) {
      allSockets[i].send(message.toString() + ": sent from the server");
    }
  });
});
