import { Router } from "express";

const { handleAddPersonToUserWatchList } = require("../contollers/user");
const { handleCheckPersonInUserWatchList } = require("../contollers/user");
const { handleFetchUserWatchList } = require("../contollers/user");
const authenticateToken = require("../middleware/authenticateToken");

const userRouter: Router = Router();

userRouter.use(authenticateToken);

userRouter.get(
  "/my-list/check/:personUID",
  authenticateToken,
  handleCheckPersonInUserWatchList
);

userRouter.post(
  "/my-list/add-person",
  authenticateToken,
  handleAddPersonToUserWatchList
);

userRouter.get("/my-list/list", authenticateToken, handleFetchUserWatchList);

module.exports = userRouter;
