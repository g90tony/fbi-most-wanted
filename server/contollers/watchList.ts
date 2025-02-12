import { Request, Response } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";
import fallbackData from "../fallbackData";

export async function handleFetchPaginatedWantedList(
  req: Request,
  res: Response
) {
  const allTargets = await axios({
    method: "GET",
    url: "https://api.fbi.gov/wanted/v1/list",
    params: {
      page: 1,
    },
  })
    .then((data) => data)
    .catch((error) => {
      console.error(
        "LIST_WANTED_LIST_FAILURE",
        { ...(error as AxiosError) }.message
      );
    });

  let resData: any[] = [];

  if (allTargets === null || allTargets === undefined) {
    resData = [...fallbackData].map((person: any) => ({
      uid: person.uid,
      title: person.title,
      publication: person.publication,
      nationality: person.nationality,
      image: person.images[0].large,
    }));

    res.status(200).json(resData);
  } else {
    resData = [...allTargets!.data].map((person: any) => ({
      uid: person.uid,
      title: person.title,
      publication: person.publication,
      nationality: person.nationality,
      image: person.images[0].large,
    }));

    res.status(200).json(resData);
  }

  if (resData.length === 0) {
    res.status(400);
  }
}

export async function handleFetchCategoryWantedList(
  req: Request,
  res: Response
) {
  let reqCategory = "";

  String(req.params.category)
    .toLowerCase()
    .split("-")
    .forEach((word, index) => {
      if (index !== 0) {
        reqCategory = `${reqCategory} ${word}`;
      } else {
        reqCategory = word;
      }
    });

  const allTargets = await axios({
    method: "GET",
    url: "https://api.fbi.gov/wanted/v1/list",
    params: {
      page: 1,
    },
  })
    .then((data) => data)
    .catch((error) => {
      console.error(
        "LIST_WANTED_LIST_FAILURE",
        { ...(error as AxiosError) }.message
      );
    });

  let resData: any[] = [];

  if (allTargets === null || allTargets === undefined) {
    fallbackData.forEach((person: any) => {
      if (String(person.subjects[0]).toLowerCase().includes(reqCategory)) {
        resData.push({
          uid: person.uid,
          title: person.title,
          publication: person.publication,
          nationality: person.nationality,
          image: person.images[0].large,
        });
      }
    });

    res.status(200).json(resData);
  } else {
    allTargets!.data.forEach((person: any) => {
      if (String(person.subjects[0]).toLowerCase().includes(reqCategory)) {
        resData.push({
          uid: person.uid,
          title: person.title,
          publication: person.publication,
          nationality: person.nationality,
          image: person.images[0].large,
        });
      }
    });

    res.status(200).json(resData);
  }

  if (resData.length === 0) {
    res.status(400);
  }
}

export async function handleFetchWantedCategories(req: Request, res: Response) {
  const allTargets = await axios({
    method: "GET",
    url: "https://api.fbi.gov/wanted/v1/list",
    params: {
      page: req.body.page,
    },
  })
    .then((data) => data)
    .catch((error) => {
      console.error(
        "LIST_WANTED_LIST_FAILURE",
        { ...(error as AxiosError) }.message
      );
    });

  let resData: any[] = [];

  const categories: string[] = [];

  if (allTargets === null || allTargets === undefined) {
    [...fallbackData].forEach((person: any) => {
      let alreadyExists: boolean = false;

      categories.forEach((category) => {
        if (category === person.subjects[0]) {
          alreadyExists = true;
        }
      });

      if (alreadyExists === false) {
        categories.push(person.subjects[0]);
      }
    });

    res.status(200).json(categories);
  } else {
    const categories: string[] = [];

    [...allTargets!.data].forEach((person: any) => {
      let alreadyExists: boolean = false;

      categories.forEach((category) => {
        if (category === person.subjects[0]) {
          alreadyExists = true;
        }
      });

      if (!alreadyExists) {
        categories.push(person.subjects[0]);
      }
    });

    res.status(200).json(categories);
  }

  if (resData.length === 0) {
    res.status(400);
  }
}

export async function handleFetchPaginatedWantedListNextPage(
  req: Request,
  res: Response
) {
  const allTargets = await axios({
    method: "GET",
    url: "https://api.fbi.gov/wanted/v1/list",
    params: {
      page: req.body.page,
    },
  })
    .then((data) => data)
    .catch((error) => {
      console.error(
        "LIST_WANTED_LIST_FAILURE",
        { ...(error as AxiosError) }.message
      );
    });

  let resData: any[] = [];

  if (allTargets === null || allTargets === undefined) {
    res.status(404);
  } else {
    resData = [...allTargets!.data].map((person: any) => ({
      uid: person.uid,
      title: person.title,
      publication: person.publication,
      nationality: person.nationality,
      image: person.images[0].large,
    }));

    res.status(200).json(resData);
  }

  if (resData.length === 0) {
    res.status(400);
  }
}
