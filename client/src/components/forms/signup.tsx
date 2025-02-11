import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import logo from "../../assets/fbi-logo.png";
import { useForm } from "react-hook-form";
import { signUpFormSchema, TSignUpFormSchema } from "@/types/formSchema";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Loader } from "lucide-react";
import handleNewUserSignUp from "@/api/handleNewUserSignUp";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useNavigate();

  const signUpForm = useForm<TSignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleNewUserSignUp,
    onSuccess: () => {
      toast.success(
        "Your account was successfully created. Your will now be redirected to the login page",
        { id: "new-user-signup" }
      );

      router("/sign-in");
    },
    onError: (error: Error) => {
      toast.success(error.message, { id: "new-user-signup" });
    },
  });

  const onSubmit = useCallback(
    (values: TSignUpFormSchema) => {
      mutate(values);
    },
    [mutate]
  );

  return (
    <div className={cn("flex flex-col gap-6 w-[40vw] ", className)} {...props}>
      <Card className="border-black bg-blue-950/20">
        <CardHeader>
          <div className="flex flex-col items-center justify-center rounded-md bg-primary text-primary-foreground">
            <img
              src={logo}
              alt="FBI Logo"
              className="block w-14 h-14 rounded-full object-cover mx-auto mb-2"
            />
          </div>
          <CardTitle className="text-2xl font-black text-white text-center w-full mb-4">
            Welcome to the FBI Most Wanted Watchlist
          </CardTitle>
          <CardDescription className="text-sm font-semibold text-white text-center w-full">
            Fill in the form below to create an account and access the FBI Most
            Wanted Watchlist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signUpForm}>
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-4 w-full">
                  <FormField
                    control={signUpForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-center w-full">
                        <FormLabel
                          className="text-blue-100 font-bold mb-2"
                          htmlFor="name"
                        >
                          Full Names
                        </FormLabel>
                        <Input
                          {...field}
                          className="bg-blue-950/20 border-blue-700/15"
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          required
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-center w-full">
                        <FormLabel
                          className="text-blue-100 font-bold mb-2"
                          htmlFor="username"
                        >
                          Username
                        </FormLabel>
                        <Input
                          {...field}
                          className="bg-blue-950/20 border-blue-700/15"
                          id="username"
                          type="text"
                          placeholder="john_d"
                          required
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row gap-4 w-full">
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-center w-full">
                        <FormLabel
                          className="text-blue-100 font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </FormLabel>
                        <Input
                          {...field}
                          className="bg-blue-950/20 border-blue-700/15"
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row gap-4 w-full">
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-center w-full">
                        <FormLabel
                          className="text-blue-100 font-bold mb-2"
                          htmlFor="password"
                        >
                          Password
                        </FormLabel>
                        <Input
                          {...field}
                          className="bg-blue-950/20 border-blue-700/15"
                          id="password"
                          type="password"
                          required
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="password2"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-center w-full">
                        <FormLabel
                          className="text-blue-100 font-bold mb-2"
                          htmlFor="password"
                        >
                          Password Confirmation
                        </FormLabel>

                        <Input
                          {...field}
                          className="bg-blue-950/20 border-blue-700/15"
                          id="password"
                          type="password"
                          required
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row flex-nowrap justify-between h-auto w-full mt-4">
                  <Button
                    onClick={signUpForm.handleSubmit(onSubmit)}
                    type="submit"
                    className="w-[200px] font-bold bg-white text-blue-700 hover:text-blue-300 hover:bg-blue-950"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader className="animate-spin text-blue-600" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <a
                      href="/sign-in"
                      className="underline underline-offset-4 font-bold"
                    >
                      Sign in
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
