import { Request, Response } from "express";

export default async function handleUserLogin(req: Request, res: Response) {
  res.status(200).json({
    message: "You have successfully hit this endpoint",
  });
}
