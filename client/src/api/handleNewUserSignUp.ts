import axiosClient from "@/lib/axios/axiosClient";
import isDevEnv from "@/lib/isDevEnv";
import { signUpFormSchema, TSignUpFormSchema } from "@/types/formSchema";

export default async function handleNewUserSignUp(form: TSignUpFormSchema) {
  console.log("form", form);

  const { success, data } = signUpFormSchema.safeParse(form);

  console.log("newConsultationForm submission", form, data);

  if (!success) {
    console.error(
      "There was a problem submitting the details. Please check the inputs and try again."
    );

    throw new Error(
      "There was a problem submitting the details. Please check the inputs and try again."
    );
  }

  let response: boolean | null = null;

  try {
    response = await new Promise((resolve, reject) => {
      axiosClient
        .get("/")
        .then(() => {
          resolve(true);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  } catch (error: unknown) {
    if (isDevEnv) console.error("There was an error creating the user", error);

    throw new Error("There was an error creating the user");
  }

  return response;
}
