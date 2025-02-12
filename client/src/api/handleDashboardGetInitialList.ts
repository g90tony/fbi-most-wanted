import { TDashboardListResponse } from "@/types/apiResponse";
import axios, { AxiosResponse } from "axios";

export default async function handleDashboardGetInitialList(token: string) {
  let response: AxiosResponse | null = null;

  try {
    response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}most-wanted/list`,
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
      data: response.data as TDashboardListResponse,
    };
  }
}
