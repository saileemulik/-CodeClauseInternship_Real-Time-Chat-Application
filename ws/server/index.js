const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8000 });

server.on("connection", socket => {
    console.log("client connected");

    socket.on("message", message => {
        console.log("Received:", message);
        
        const messagetosend = message instanceof Buffer ? message.toString() : message;

        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(messagetosend);
            }
        });
    });

    socket.on("close", () => {

        
        console.log("client disconnected");
    });

    socket.on("error", error => {
        console.log("Error:", error);
    });
});

console.log("WebSocket running on ws://localhost:8000");