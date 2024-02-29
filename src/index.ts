import { Server } from "socket.io";
const PORT = +(process.env.PORT || 3333);

const io = new Server(PORT, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Connect: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Disconnect: ${socket.id}`);
  });

  socket.on("message", (msg, callback) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    io.emit("message", msg); // Broadcast the message to all clients
    callback("Message received");
  });
});

console.log("WebSocket server running on port ", PORT);
