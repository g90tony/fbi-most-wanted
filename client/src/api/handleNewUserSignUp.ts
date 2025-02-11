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
}
