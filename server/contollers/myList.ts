import { Request, Response } from "express";
import prismaClient from "../lib/prisma/client";
import { IUserAuthRequestObj } from "../lib/types/auth";
import { utilFindWantedPerson } from "./watchList";
import { PrismaClient } from "@prisma/client";

export async function handleFetchUserWatchList(
  req: IUserAuthRequestObj,
  res: Response
) {
  let userListId: any | null = null;
  console.info("Found User List", req.params);

  try {
    userListId = await prismaClient.userList.findFirst({
      where: {
        user_id: req.user.id,
      },
    });
  } catch (error) {
    console.error("FETCH_USER_LIST_DATA_ERROR", error);
  }

  console.log("userListData", userListId);

  if (userListId !== null && userListId !== undefined) {
    let listPersons: any | null = null;

    try {
      listPersons = await prismaClient.userListPerson.findMany({
        where: {
          list_id: userListId,
        },
      });
    } catch (error) {
      console.log("FETCH_USER_LIST_DATA_ERROR", error);
    }

    if (listPersons.data === null) {
      res.status(404);
    } else if (listPersons.data.length === 0) {
      res.status(200).json([]);
    }

    console.log("listPersons", listPersons);

    const listPersonsData: any[] | Promise<any[]> = [];

    listPersons.data.forEach(async (person: any) => {
      const foundPerson: any | null = await utilFindWantedPerson(
        person.uid,
        parseInt(req.params.page!)
      );

      console.log("foundPerson", foundPerson);

      if (foundPerson !== null) {
        listPersonsData.push(foundPerson);
      }
    });

    res.status(200).json(listPersonsData);
  } else if (userListId === null) {
    let newUserList: any | null;

    try {
      newUserList = await prismaClient.userList.create({
        data: {
          user_id: req.user.id,
        },
      });
    } catch (error) {
      console.log("FETCH_USER_LIST_DATA_ERROR", error);
    }

    console.log("newUserListId", newUserList);

    if (newUserList !== null) {
      res.status(200).json([]);
    } else {
      res
        .status(500)
        .json({ message: "There was a problem fetching your list." });
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
    .then(async (data) => {
      if (data !== null) {
        return data.id;
      } else {
        return await prismaClient.userList
          .create({
            data: {
              user_id: req.user.id,
            },
          })
          .then((data) => data.id)
          .catch((error) => {
            if (process.env.ENV === "development")
              console.error("userSessionData error", error);

            res.status(500).json({
              message: { ...(error as Error) }.message,
            });
          });
      }
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
          req.body.personUid,
          parseInt(req.params.page)
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
