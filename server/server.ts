import express, { Express } from "express";
import dotenv from "dotenv";

const cors = require("cors");
const authRouter = require("./routes/auth");
const watchListRouter = require("./routes/watchList");
const myListRouter = require("./routes/myList");

const server: Express = express();

var allowlist = ["https://localhost:3000", "http://127.0.0.1", "*"];

var corsOptionsDelegate = function (req: any, callback: any) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

dotenv.config();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors(corsOptionsDelegate));

const port = process.env.SERVER_PORT || 4002;

server.use("/auth", authRouter);

server.use("/most-wanted", watchListRouter);

server.use("/my-list", myListRouter);

server.listen(port, () => {
  console.log("Server Running on port", port);
});
