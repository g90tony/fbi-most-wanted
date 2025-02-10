import express, { Router } from "express";
import handleUserLogin from "../contollers/auth";

const authRouter: Router = express.Router();

authRouter.post("/login", handleUserLogin);

export default authRouter;
