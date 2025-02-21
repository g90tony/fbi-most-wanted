import { Request, Response } from "express";
import axios, { AxiosError } from "axios";

export async function handleFetchPaginatedWantedList(
  req: Request,
  res: Response
) {
  let resData: any[] = [];

  try {
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
    });

    resData = allTargets.data.items.map((person: any) => ({
      uid: person.uid,
      title: person.title,
      publication: person.publication,
      nationality: person.nationality,
      image: person.images[0].large,
    }));

    res.status(200).json(resData);
  } catch (error) {
    console.error(
      "LIST_WANTED_LIST_FAILURE",
      { ...(error as AxiosError) }.message
    );
  }
}

export async function handleFetchWantedPerson(req: Request, res: Response) {
  const personUID = req.params.personUID;
  let resData: any | null = null;

  try {
    const target = await axios({
      method: "GET",
      url: `https://api.fbi.gov/@wanted-person/${personUID}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

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
  } catch (error) {
    console.error(
      "LIST_WANTED_LIST_FAILURE",
      { ...(error as AxiosError) }.message
    );

    res.status(500).json({
      message:
        "There was a problem fetching the wanted person. Please try again later.",
    });
  }

  if (resData !== null) {
    res.status(200).json(resData);
  } else {
    res
      .status(404)
      .json({ message: "The person with that uid does not exist." });
  }
}

export async function handleFetchCategoryWantedList(
  req: Request,
  res: Response
) {
  let reqCategory = "";
  let resData: any[] = [];

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

  try {
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
    });

    for (let i = 0; i < allTargets.data.items.length; i++) {
      const person = allTargets.data.items[i];

      resData.push({
        uid: person.uid,
        title: person.title,
        publication: person.publication,
        nationality: person.nationality,
        image: person.images[0].large,
      });
    }
  } catch (error) {
    console.error(
      "CATEGORY_WANTED_LIST_FAILURE",
      { ...(error as AxiosError) }.message
    );

    res.status(500).json({
      message: "There was a problem fetching the category watch list.",
    });
  }

  res.status(200).json(resData);
}

export async function handleFetchWantedCategories(req: Request, res: Response) {
  let itemCount: number = 0;
  let personsLoaded: number = 0;
  let maxPages = 0;
  let resData: any[] = [];

  try {
    const response = await axios({
      method: "GET",
      url: `https://api.fbi.gov/wanted/v1/list`,
      params: {
        page: 1,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    console.log(
      "maxPages",
      Math.floor(response.data.total / response.data.items.length)
    );

    maxPages = Math.floor(response.data.total / response.data.items.length) + 1;
  } catch (error) {
    console.error(
      "CATEGORIES_TOTAL_ITEM_COUNT_FAILURE",
      { ...(error as AxiosError) }.message
    );
  }

  if (maxPages > 0) {
    for (let page = 1; page < maxPages; page++) {
      try {
        setTimeout(async () => {
          const allTargets = await axios({
            method: "GET",
            url: `https://api.fbi.gov/wanted/v1/list`,
            params: {
              page,
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
          });

          const categories: string[] = [...resData];

          for (let i = 0; i < allTargets.data.items.length; i++) {
            const person = allTargets.data.items[i];
            let alreadyExists: boolean = false;

            for (let catIndex = 0; catIndex < categories.length; catIndex++) {
              const category = categories[catIndex];

              if (category === person.subjects[0]) {
                alreadyExists = true;
              }
            }

            if (!alreadyExists) {
              categories.push(person.subjects[0]);
              console.log("new cat", person.subjects[0]);
            }
          }
        }, 350);
      } catch (error) {
        console.error(
          "LIST_WANTED_CATEGORIES_FAILURE",
          { ...(error as AxiosError) }.message
        );
      }
    }

    res.status(200).json(resData);
  } else {
    res
      .status(500)
      .json({ message: "There was a problem fetching the wanted categories" });
  }
}

export async function handleFetchPaginatedWantedListNextPage(
  req: Request,
  res: Response
) {
  let resData: any[] = [];

  try {
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
    });

    resData = [...allTargets!.data].map((person: any) => ({
      uid: person.uid,
      title: person.title,
      publication: person.publication,
      nationality: person.nationality,
      image: person.images[0].large,
    }));

    res.status(200).json(resData);
  } catch (error) {
    console.error(
      "LIST_WANTED_LIST_FAILURE",
      { ...(error as AxiosError) }.message
    );
  }
}

export async function utilFindWantedPerson(personUid: string, page: number) {
  let resData: any | null = null;

  try {
    const allTargets = await axios({
      method: "GET",
      url: `https://api.fbi.gov/wanted/v1/list`,
      params: {
        page,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    for (let i = 0; i < allTargets.data.items.length; i++) {
      const person = allTargets.data.items[i];
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
    }

    return resData;
  } catch (error) {
    console.error(
      "LIST_WANTED_LIST_FAILURE",
      { ...(error as AxiosError) }.message
    );
  }

  return null;
}
