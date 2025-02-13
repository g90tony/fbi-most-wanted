import { Router } from "express";
import {
  handleFetchCategoryWantedList,
  handleFetchPaginatedWantedList,
  handleFetchPaginatedWantedListNextPage,
  handleFetchWantedCategories,
  handleFetchWantedPerson,
} from "../contollers/watchList";

const authenticateToken = require("../middleware/authenticateToken");
const watchListRouter: Router = Router();

watchListRouter.use(authenticateToken);

watchListRouter.get("/list/:page", handleFetchPaginatedWantedList);
watchListRouter.get("/list/next", handleFetchPaginatedWantedListNextPage);
watchListRouter.get("/categories", handleFetchWantedCategories);
watchListRouter.get("/categories/:category", handleFetchCategoryWantedList);
watchListRouter.get("/get/:personUID", handleFetchWantedPerson);

module.exports = watchListRouter;
