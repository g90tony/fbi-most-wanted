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
  let authenticatedUser: {
    id: number;
    name: string;
    email: string;
    sessionToken: string;
    tokenExpiryTime: number;
  } | null = null;

  if (process.env.ENV === "development") console.log("reqData", reqData);

  try {
    authenticatedUser = await new Promise(async (resolve, reject) => {
      await prismaClient.user
        .findFirst({
          where: {
            email: reqData.email,
          },
        })
        .then(async (userData) => {
          if (process.env.ENV === "development")
            console.log("userData", userData);

          if (userData === null) {
            if (process.env.ENV === "development")
              console.error("user not found", userData);
            reject("The user email does not exist.");
          } else {
            if (process.env.ENV === "development")
              console.info("user found", userData);

            const passwordMatch: boolean = await validatePassword(
              reqData.password,
              userData.password
            );

            if (passwordMatch) {
              if (process.env.ENV === "development")
                console.info("password match");

              const newSessionToken = generateAccessToken({
                email: userData.email,
                id: userData.id,
                username: userData.user_name,
              });

              await prismaClient.userSession
                .create({
                  data: {
                    session_token: newSessionToken,
                    userId: userData.id,
                    expiryTime: addDays(new Date(), 1).getTime(),
                  },
                })
                .then((userSessionData) => {
                  if (process.env.ENV === "development")
                    console.info("session", userSessionData);

                  resolve({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    sessionToken: userSessionData.session_token,
                    tokenExpiryTime: parseInt(
                      String(userSessionData.expiryTime)
                    ),
                  });
                })
                .catch((error: Error) => {
                  if (process.env.ENV === "development")
                    console.error("password incorrect", error.message);

                  reject(error.message);
                });
            } else {
              if (process.env.ENV === "development")
                console.error("password incorrect", userData);

              reject("The user password in incorrect.");
            }
          }
        })
        .catch((error: Error) => {
          if (process.env.ENV === "development")
            console.error("userSessionData error", error);

          res.status(500).json({
            message: error.message,
          });
        });
    });

    if (process.env.ENV === "development")
      console.info("authenticatedUser", authenticatedUser);

    if (authenticatedUser) {
      res.status(200).json(authenticatedUser);
    }
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function handleCreateUser(req: Request, res: Response) {
  const reqData: TAuthCreateUser = req.body;

  if (process.env.ENV === "development")
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
