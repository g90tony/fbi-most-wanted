import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { IUserAuthRequestObj } from "../lib/types/auth";

const authenticateToken: (
  req: IUserAuthRequestObj,
  res: Response,
  next: NextFunction
) => void = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err) {
        res.sendStatus(403);
        return;
      }

      req.user = user; // Or req.auth = user, or whatever you prefer
      next();
    }
  );
};

module.exports = authenticateToken;
