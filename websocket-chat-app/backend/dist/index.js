import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
wss.on("connection", (socket) => {
    userCount = userCount + 1;
    socket.on("message", (message) => {
        console.log("Message received " + message.toString());
        setInterval(() => {
            socket.send(message.toString());
        }, 2000);
    });
});
//# sourceMappingURL=index.js.map