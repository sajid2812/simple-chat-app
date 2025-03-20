import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    // @ts-ignore
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }
    if (parsedMessage.type === "chat") {
      const currUser = allSockets.find((a) => a.socket === socket);
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].room === currUser?.room) {
          allSockets[i].socket.send(parsedMessage.payload.message);
        }
      }
    }
  });

  socket.on("close", () => {
    // do something
  });
});
