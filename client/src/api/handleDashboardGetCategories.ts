import axios, { AxiosResponse } from "axios";

export default async function handleDashboardGetCategories(token: string) {
  let response: AxiosResponse | null = null;

  try {
    response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}most-wanted/categories`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error({ ...(error as Error) }.message);
    return { status: "error", message: { ...(error as Error) }.message };
  }

  console.log(response);

  if (response !== null && response.status === 200) {
    return {
      status: "success",
      data: response.data as string[],
    };
  }
}
