import { Request, Response } from "express";

export default async function handleFetchPaginatedWantedList(
  req: Request,
  res: Response
) {
  res.status(200).json({
    message: "You have successfully hit this endpoint",
  });
}
