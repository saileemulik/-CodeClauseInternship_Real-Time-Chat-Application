// const socket=new WebSocket("ws://localhost:8000");
// const messageInput=document.getElementById('message-input');
// const sendButton=document.getElementById('send-button'); 
// const messageList=document.getElementById('messages');
// socket.onopen = function(event){
//     console.log("Connection opened",event);
// }
// socket.onmessage=function(event){
//     if(typeof event.data == 'string'){
//         const messageItem = document.createElement("li");
//         messageItem.textContent=event.data;
//         messageList.appendChild(messageItem);
//     }
//     else if(event.data instanceof Blob){
//         //blog logic
//     }
// };

// socket.onerror = function(error){
//     console.error("WebSocket Error: ",error);
// }

// socket.onclose = function(event){
//     console.log("Connection closed",event);
// }

// sendButton.addEventListener("click",()=>{
//     const message=messageInput.value;
//     if(message){
//         socket.send(message);
//         messageInput.value = "";
//     }
// });

// messageInput.addEventListener("keypress",(event)=>{
//     if(event.key == "Enter"){
//         sendButton.click();
//     }
// });
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8000 });

server.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", (message) => {
        console.log("Received:", message);

        // Broadcast the message to all connected clients
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (error) => {
        console.error("WebSocket Error:", error);
    });
});

console.log("WebSocket server is running on ws://localhost:8000");
