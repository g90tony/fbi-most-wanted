import { signInFormSchema, TSignInFormSchema } from "@/types/formSchema";
import { TUserSignInResponse } from "../types/apiResponse";

import isDevEnv from "@/lib/isDevEnv";
import axios, { AxiosResponse } from "axios";

export default async function handleUserSignIn(form: TSignInFormSchema) {
  let response: TUserSignInResponse | null = null;

  const { success, data } = signInFormSchema.safeParse(form);

  console.log("newConsultationForm submission", form, data);

  if (!success) {
    console.error(
      "There was a problem submitting the details. Please check the inputs and try again."
    );

    throw new Error(
      "There was a problem submitting the details. Please check the inputs and try again."
    );
  }

  try {
    response = await new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}auth/login`,
        data: {
          ...form,
        },
      })
        .then((res: AxiosResponse) => {
          const data = res.data as TUserSignInResponse;

          if (isDevEnv) console.log("res", res.data);

          resolve({
            id: data.id,
            email: data.email,
            name: data.name,
            sessionToken: data.sessionToken,
            tokenExpiryTime: data.tokenExpiryTime,
          });
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  } catch (error: unknown) {
    if (isDevEnv) console.error("There was an error signing you in", error);

    throw new Error(
      "There was an error signing you in. Please try again later."
    );
  }

  if (response !== null) {
    const authResponse: TUserSignInResponse = {
      id: response.id,
      email: response.email,
      name: response.name,
      sessionToken: response.sessionToken,
      tokenExpiryTime: response.tokenExpiryTime,
    };

    return authResponse;
  } else {
    throw new Error(
      "There was an error signing you in. Please try again later."
    );
  }
}
