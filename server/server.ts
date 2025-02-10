import express, { Express } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";

const server: Express = express();

dotenv.config();
server.use(express.urlencoded({ extended: true }));

const port = process.env.SERVER_PORT || 4002;

server.use("/auth", authRouter);

server.listen(port, () => {
  console.log("Server Running on port", port);
});
