import { Request, Response } from "express";
import prismaClient from "../lib/prisma/client";
import { IUserAuthRequestObj } from "../lib/types/auth";
import { utilFindWantedPerson } from "./watchList";

export async function handleFetchUserWatchList(
  req: IUserAuthRequestObj,
  res: Response
) {
  let userListId: any | null = null;

  userListId = await prismaClient.userList
    .findFirst({
      where: {
        user_id: req.user.id,
      },
    })
    .then((data) => {
      data !== null ? data.id : null;
    })
    .catch((error) => {
      if (process.env.ENV === "development")
        console.error("userSessionData error", error);

      res.status(500).json({
        message: { ...(error as Error) }.message,
      });
    });

  if (userListId !== null && userListId !== undefined) {
    const listPersons = await prismaClient.userListPerson
      .findMany({
        where: {
          list_id: userListId,
        },
      })
      .then((data) => {
        if (data === null) {
          res.status(404);
        } else if (data.length === 0) {
          res.status(200).json([]);
        }

        const listPersonsData: any[] | PromiseLike<any[]> = [];

        data.forEach(async (person) => {
          const foundPerson: any | null = await utilFindWantedPerson(
            person.uid
          );

          if (foundPerson !== null) {
            listPersonsData.push(foundPerson);
          }
        });

        return listPersonsData;
      })
      .catch((error) => {
        console.error("userSessionData error", error);

        res.status(500).json({
          message: { ...(error as Error) }.message,
        });
      });

    if (listPersons !== undefined) {
      res.status(200).json(listPersons);
    }
  }
}

export async function handleAddPersonToUserWatchList(
  req: IUserAuthRequestObj,
  res: Response
) {
  let userListId: any | null = null;

  userListId = await prismaClient.userList
    .findFirst({
      where: {
        user_id: req.user.id,
      },
    })
    .then((data) => {
      data !== null ? data.id : null;
    })
    .catch((error) => {
      if (process.env.ENV === "development")
        console.error("userSessionData error", error);

      res.status(500).json({
        message: { ...(error as Error) }.message,
      });
    });

  if (userListId !== null && userListId !== undefined) {
    const listPerson = await prismaClient.userListPerson
      .create({
        data: {
          person_uid: req.body.personUid,
          uid: req.body.personUid,
          list_id: userListId,
        },
      })
      .then(async () => {
        const foundPerson: any | null = await utilFindWantedPerson(
          req.body.personUid
        );

        if (foundPerson !== null) {
          return foundPerson;
        }
      })
      .catch((error) => {
        console.error("userSessionData error", error);

        res.status(500).json({
          message: { ...(error as Error) }.message,
        });
      });

    if (listPerson !== undefined) {
      res.status(200).json(listPerson);
    }
  }
}

export async function handleCheckPersonInUserWatchList(
  req: IUserAuthRequestObj,
  res: Response
) {
  let userListId: any | null = null;

  userListId = await prismaClient.userList
    .findFirst({
      where: {
        user_id: req.user.id,
      },
    })
    .then((data) => {
      data !== null ? data.id : null;
    })
    .catch((error) => {
      if (process.env.ENV === "development")
        console.error("userSessionData error", error);

      res.status(500).json({
        message: { ...(error as Error) }.message,
      });
    });

  if (userListId !== null && userListId !== undefined) {
    const wasFound = await prismaClient.userListPerson
      .findFirst({
        where: {
          person_uid: req.body.personUid,
        },
      })
      .then(async (foundPerson) => {
        if (foundPerson === null) {
          return { isListed: false };
        } else {
          return { isListed: true };
        }
      })
      .catch((error) => {
        console.error("userSessionData error", error);

        res.status(500).json({
          message: { ...(error as Error) }.message,
        });
      });

    if (wasFound !== undefined) {
      res.status(200).json(wasFound);
    }
  }
}
