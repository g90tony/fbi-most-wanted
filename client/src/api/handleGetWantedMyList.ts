import { TWantedListResponse } from "@/types/apiResponse";
import axios, { AxiosResponse } from "axios";

export default async function handleGetWantedMyList(
  token: string,
  page: number
) {
  let response: AxiosResponse | null = null;

  try {
    response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}my-list/list/${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response !== null && response.status === 200) {
      return {
        status: "success",
        data: response.data as TWantedListResponse,
      };
    }
  } catch (error) {
    throw new Error({ ...(error as Error) }.message);
  }
}
