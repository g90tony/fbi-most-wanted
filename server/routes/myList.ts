import { Router } from "express";

const { handleAddPersonToUserWatchList } = require("../contollers/myList");
const { handleCheckPersonInUserWatchList } = require("../contollers/myList");
const { handleFetchUserWatchList } = require("../contollers/myList");
const authenticateToken = require("../middleware/authenticateToken");

const myListRouter: Router = Router();

myListRouter.use(authenticateToken);

myListRouter.get(
  "/check/:personUID",
  authenticateToken,
  handleCheckPersonInUserWatchList
);

myListRouter.post(
  "/add-person",
  authenticateToken,
  handleAddPersonToUserWatchList
);

myListRouter.get("/list/:page", authenticateToken, handleFetchUserWatchList);

module.exports = myListRouter;
