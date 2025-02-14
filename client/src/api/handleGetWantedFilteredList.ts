import { TWantedListResponse } from "@/types/apiResponse";
import axios, { AxiosResponse } from "axios";

export default async function handleGetWantedFilteredList(
  token: string,
  filter: {
    type: "category" | "nationality" | "race" | "search";
    query: string;
  },
  page: number
) {
  let response: AxiosResponse | null = null;

  try {
    response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}most-wanted/filter/${page}?filter=${
        filter.type
      }&query=${filter.query}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: filter,
    });
  } catch (error) {
    throw new Error({ ...(error as Error) }.message);
  }

  if (response !== null && response.status === 200) {
    return {
      status: "success",
      data: response.data as TWantedListResponse,
    };
  }
}
