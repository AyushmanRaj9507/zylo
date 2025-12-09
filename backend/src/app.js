import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://araj53062_db_user:0MOClqpN3jzTxkqM@cluster0.jzuyu99.mongodb.net/")

    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    // server.listen(app.get("port"), () => {
    //     console.log("LISTENING ON PORT 8000")
    // });
    const PORT = process.env.PORT || 8000;

    server.listen(PORT, () => {
        console.log(`SERVER RUNNING ON PORT ${PORT}`);
    });
}

start();