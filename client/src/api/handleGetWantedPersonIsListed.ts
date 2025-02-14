import axios from "axios";

export default async function handleGetWantedPersonIsListed(
  token: string,
  personUid: string
) {
  let response: boolean | null = null;

  try {
    response = await new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: `${import.meta.env.VITE_API_URL}my-list/check/${personUid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res: unknown) => {
          resolve(res as boolean);
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
