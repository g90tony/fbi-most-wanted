import { TWantedListResponse } from "@/types/apiResponse";
import axios from "axios";

export default async function handlePostWantedMyListNewPerson(
  token: string,
  personUid: string
) {
  let response: TWantedListResponse | null = null;

  try {
    response = await new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}my-list/add-person`,
        data: { personUid: personUid },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res: unknown) => {
          resolve(res as TWantedListResponse);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  } catch (error: unknown) {
    const err: Error = error as Error;

    throw new Error(err.message as string);
  }

  if (response !== null) {
    return true;
  }
}
