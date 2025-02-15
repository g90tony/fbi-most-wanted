import { Request, Response } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";
import fallbackData from "../fallbackData";

export async function handleFetchPaginatedWantedList(
  req: Request,
  res: Response
) {
  const allTargets = await axios({
    method: "GET",
    url: `https://api.fbi.gov/wanted/v1/list/`,
    params: {
      page: req.params.page,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
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
    resData = [...allTargets!.data.items].map((person: any) => ({
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

export async function handleFetchWantedPerson(req: Request, res: Response) {
  const personUID = req.params.personUID;

  const target = await axios({
    method: "GET",
    url: `https://api.fbi.gov/@wanted-person/${personUID}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  })
    .then((data) => data)
    .catch((error) => {
      console.error(
        "LIST_WANTED_LIST_FAILURE",
        { ...(error as AxiosError) }.message
      );
    });

  let resData: any | null = null;

  if (target === null || target === undefined) {
    console.log("target", target);

    [...fallbackData].forEach((person: any) => {
      if (person.uid === personUID) {
        resData = {
          uid: person.uid,
          occupations: person.occupations !== null ? person.occupations : [],
          sex: person.sex !== null ? person.sex : "--",
          dates_of_birth_used:
            person.dates_of_birth_used !== null
              ? person.dates_of_birth_used
              : [],
          caution: person.caution !== null ? person.caution : "--",
          nationality: person.nationality !== null ? person.nationality : "--",
          subjects: person.subjects !== null ? person.subjects : [],
          aliases: person.aliases !== null ? person.aliases : [],
          title: person.title !== null ? person.title : "--",
          languages: person.languages !== null ? person.languages : [],
          details: person.details !== null ? person.details : "--",
          image: person.images[0].large,
        };
      }
    });

    console.log(personUID, resData);

    if (resData !== null) {
      res.status(200).json(resData);
    } else {
      res.status(404);
    }
  } else {
    resData = {
      uid: target.data.uid,
      occupations:
        target.data.occupations !== null ? target.data.occupations : [],
      sex: target.data.sex !== null ? target.data.sex : "--",
      dates_of_birth_used:
        target.data.dates_of_birth_used !== null
          ? target.data.dates_of_birth_used
          : [],
      caution: target.data.caution !== null ? target.data.caution : "--",
      nationality:
        target.data.nationality !== null ? target.data.nationality : "--",
      subjects: target.data.subjects !== null ? target.data.subjects : [],
      aliases: target.data.aliases !== null ? target.data.aliases : [],
      title: target.data.title !== null ? target.data.title : "--",
      languages: target.data.languages !== null ? target.data.languages : [],
      details: target.data.details !== null ? target.data.details : "--",
      image: target.data.images[0].large,
    };

    if (resData !== null) {
      res.status(200).json(resData);
    } else {
      res.status(404);
    }
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
    url: `https://api.fbi.gov/wanted/v1/list`,
    params: {
      page: req.params.page,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
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
    allTargets!.data.items.forEach((person: any) => {
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
    url: `https://api.fbi.gov/wanted/v1/list`,
    params: {
      page: req.body.page,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
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

    [...allTargets!.data.items].forEach((person: any) => {
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
    url: `https://api.fbi.gov/wanted/v1/list`,
    params: {
      page: req.body.page,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
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

export async function utilFindWantedPerson(personUid: string, page: number) {
  const allTargets = await axios({
    method: "GET",
    url: `https://api.fbi.gov/wanted/v1/list`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  })
    .then((data) => data)
    .catch((error) => {
      console.error(
        "LIST_WANTED_LIST_FAILURE",
        { ...(error as AxiosError) }.message
      );
    });

  let resData: any | null = null;

  if (allTargets === null || allTargets === undefined) {
    [...fallbackData].forEach((person: any) => {
      if (person.uid === personUid) {
        resData = {
          uid: person.uid,
          occupations: person.occupations !== null ? person.occupations : [],
          sex: person.sex !== null ? person.sex : "--",
          dates_of_birth_used:
            person.dates_of_birth_used !== null
              ? person.dates_of_birth_used
              : [],
          caution: person.caution !== null ? person.caution : "--",
          nationality: person.nationality !== null ? person.nationality : "--",
          subjects: person.subjects !== null ? person.subjects : [],
          aliases: person.aliases !== null ? person.aliases : [],
          title: person.title !== null ? person.title : "--",
          languages: person.languages !== null ? person.languages : [],
          details: person.details !== null ? person.details : "--",
          image: person.images[0].large,
        };
      }
    });

    return resData;
  } else {
    [...allTargets!.data.items].forEach((person: any) => {
      if (person.uid === personUid) {
        resData = {
          uid: person.uid,
          occupations: person.occupations !== null ? person.occupations : [],
          sex: person.sex !== null ? person.sex : "--",
          dates_of_birth_used:
            person.dates_of_birth_used !== null
              ? person.dates_of_birth_used
              : [],
          caution: person.caution !== null ? person.caution : "--",
          nationality: person.nationality !== null ? person.nationality : "--",
          subjects: person.subjects !== null ? person.subjects : [],
          aliases: person.aliases !== null ? person.aliases : [],
          title: person.title !== null ? person.title : "--",
          languages: person.languages !== null ? person.languages : [],
          details: person.details !== null ? person.details : "--",
          image: person.images[0].large,
        };
      }
    });

    return resData;
  }
}
