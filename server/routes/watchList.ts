import { Router } from "express";
import express from "express";
import handleFetchPaginatedWantedList from "../contollers/watchList";

const watchListRouter: Router = express.Router();

watchListRouter.get("/list", handleFetchPaginatedWantedList);

export default watchListRouter;
