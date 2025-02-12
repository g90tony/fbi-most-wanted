import { TWantedPersonDetails } from "@/types/types";
import axios, { AxiosResponse } from "axios";

export default async function handleDashboardGetPersonDetails(
  token: string,
  uid: string
) {
  let response: AxiosResponse | null = null;

  try {
    response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}most-wanted/get/${uid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error({ ...(error as Error) }.message);
  }

  if (response !== null && response.status === 200) {
    return {
      status: "success",
      data: response.data as TWantedPersonDetails,
    };
  }
}
