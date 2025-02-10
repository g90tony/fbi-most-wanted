import jwt from "jsonwebtoken";
import { TAuthJWT } from "../types/auth";

export function generateAccessToken(authObj: TAuthJWT) {
  return jwt.sign(authObj, process.env.TOKEN_SECRET!, { expiresIn: "1800s" });
}
