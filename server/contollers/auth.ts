import { Request, Response } from "express";
import { TAuthCreateUser } from "../lib/types/formSchema";
import prismaClient from "../lib/prisma/client";
import hashPassword from "../lib/cryptography/hashPassword";
import validatePassword from "../lib/cryptography/validatePassword";
import { TAuthAuthenticateUser } from "../lib/types/auth";
import { generateAccessToken } from "../lib/jwt/generateToken";

import { addDays } from "date-fns";

export async function handleAuthenticateUser(req: Request, res: Response) {
  const reqData: TAuthAuthenticateUser = req.body;

  const authenticatedUser = await new Promise(async (resolve) => {
    await prismaClient.user
      .findFirst({
        where: {
          email: reqData.email,
        },
      })
      .then(async (userData) => {
        if (userData === null) {
          res.status(404).json({ message: "The user email does not exist." });
        } else {
          const passwordMatch: boolean = await validatePassword(
            reqData.password,
            userData.password
          );

          if (passwordMatch) {
            const newSessionToken = generateAccessToken({
              email: userData.email,
              id: userData.id,
              username: userData.user_name,
            });

            prismaClient.userSession
              .create({
                data: {
                  session_token: newSessionToken,
                  userId: userData.id,
                  expiryTime: addDays(new Date(), 1).getTime(),
                },
              })
              .then((userSessionData) => {
                res.status(200).json({
                  user: {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    userName: userData.user_name,
                  },
                  auth: {
                    token: userSessionData.session_token,
                    expiryTime: userSessionData.expiryTime,
                  },
                });

                resolve(true);
              })
              .catch((error: Error) => {
                res.status(500).json({ message: error.message });
              });
          } else {
            res
              .status(400)
              .json({ message: "The user password in incorrect." });
          }
        }
      })
      .catch((error: Error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  });

  if (authenticatedUser) {
    res.status(200).json({
      message: "You have successfully hit this endpoint",
    });
  }
}

export async function handleCreateUser(req: Request, res: Response) {
  const reqData: TAuthCreateUser = req.body;

  console.log("reqData", reqData, req.body);

  const newUser = await new Promise(async function (resolve) {
    const userExists: boolean = await prismaClient.user
      .findMany({
        where: {
          email: reqData.email,
        },
      })
      .then((data) => {
        if (data.length !== 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error: Error) => {
        res.status(500).json({
          message: error.message,
        });
        return false;
      });

    if (userExists === false) {
      const hashedPassword: string = await hashPassword(reqData.password);

      await prismaClient.user
        .create({
          data: {
            email: reqData.email,
            user_name: reqData.username,
            name: `${reqData.firstName} ${reqData.lastName}`,
            password: hashedPassword,
          },
        })
        .then((data) => {
          resolve({
            id: data.id,
            email: data.email,
            username: data.user_name,
          });
        })
        .catch((error: Error) => {
          res.status(500).json({
            message: error.message,
          });
        });
    }
  });

  res.status(200).json({
    data: newUser,
  });
}
