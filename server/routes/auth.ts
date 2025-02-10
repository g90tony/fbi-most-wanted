import express, { Router } from "express";
import { handleAuthenticateUser, handleCreateUser } from "../contollers/auth";

const authRouter: Router = express.Router();

authRouter.post("/login", handleAuthenticateUser);
authRouter.post("/signup", handleCreateUser);

module.exports = authRouter;
