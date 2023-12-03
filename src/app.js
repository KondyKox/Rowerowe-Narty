import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectToDatabase from "./services/database.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect with MongoDB
connectToDatabase();

// CORS middleware
app.use(cors());

// JSON middleware
app.use(express.json());

// User router
app.use("/api/users", userRoutes);

// New client connected (Socket.io)
io.on("connection", (socket) => {
  console.log("New client connected.");

  socket.on("example-event", (data) => {
    console.log("Data retrieved: ", data);
    io.emit("example-event-response", "Response");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
