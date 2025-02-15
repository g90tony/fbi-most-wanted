import { Router } from "express";

const { handleAddPersonToUserWatchList } = require("../contollers/user");
const { handleCheckPersonInUserWatchList } = require("../contollers/user");
const { handleFetchUserWatchList } = require("../contollers/user");
const authenticateToken = require("../middleware/authenticateToken");

const userRouter: Router = Router();

userRouter.use(authenticateToken);

userRouter.get(
  "/check/:personUID",
  authenticateToken,
  handleCheckPersonInUserWatchList
);

userRouter.post(
  "/add-person",
  authenticateToken,
  handleAddPersonToUserWatchList
);

userRouter.get("/list/:page", authenticateToken, handleFetchUserWatchList);

module.exports = userRouter;
