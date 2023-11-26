import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import { User, Skin } from "./models/models.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// URI to MongoDB database
const uri = "mongodb://127.0.0.1:27017/rowerowe-narty";

// Connect to database by using mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", (error) =>
  console.error("Connection error with MongoDB:", error)
);
db.once("open", () => {
  console.log("Connected to MongoDB");
});

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
