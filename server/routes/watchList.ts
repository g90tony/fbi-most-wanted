import { Router } from "express";
import handleFetchPaginatedWantedList from "../contollers/watchList";

const authenticateToken = require("../middleware/authenticateToken");
const watchListRouter: Router = Router();

watchListRouter.use(authenticateToken);

watchListRouter.get("/list", handleFetchPaginatedWantedList);

module.exports = watchListRouter;
