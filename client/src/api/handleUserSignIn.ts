import { signInFormSchema, TSignInFormSchema } from "@/types/formSchema";
import { TUserSignInResponse } from "../types/apiResponse";

export default async function handleUserSignIn(form: TSignInFormSchema) {
  console.log("form", form);

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

  const authResponse: TUserSignInResponse = {
    id: Math.floor(Math.random() * (100 - 1)),
    email: "calebmbugua@gmail.com",
    name: "Caleb Tony",
    sessionToken: "SKFOEJFOFVOEKWPD",
  };

  return authResponse;
}
