import isDevEnv from "@/lib/isDevEnv";
import { signUpFormSchema, TSignUpFormSchema } from "@/types/formSchema";
import axios from "axios";

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

  if (form.password !== form.password2) {
    console.error("The entered passwords do not match.");

    throw new Error("The entered passwords do not match.");
  }

  let response: boolean | null = null;

  try {
    response = await new Promise((resolve, reject) => {
      axios({
        method: "post",

        url: `${import.meta.env.VITE_API_URL}auth/signup`,

        data: { ...form },
      })
        .then((data) => {
          if (isDevEnv) console.error("CREATE_USER_REQUEST_SUCCESS", data);
          resolve(true);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });

    return response;
  } catch (error: unknown) {
    if (isDevEnv) console.error("CREATE_USER_REQUEST_FAILURE", error);

    throw new Error(
      "There was an error creating your account. Please try again later"
    );
  }
}
