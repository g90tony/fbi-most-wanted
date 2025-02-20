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
import { signInFormSchema, TSignInFormSchema } from "../../types/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { Loader } from "lucide-react";
import { useCallback } from "react";
import { TUserSignInResponse } from "../../types/apiResponse";
import handleUserSignIn from "@/api/handleUserSignIn";
import { AUTHENTICATE_USER } from "@/state/slices/authStateSlice";
import { useDispatch } from "react-redux";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const dispatch = useDispatch();

  const signInForm = useForm<TSignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleUserSignIn,
    onSuccess: (userAuthObj: TUserSignInResponse) => {
      toast.success(
        `Welcome back, ${userAuthObj.name}. You have been successfully authenticated. Your will now be redirected to the login page`,
        { id: "exisiting-user-signin" }
      );
      dispatch(
        AUTHENTICATE_USER({
          id: userAuthObj.id,
          email: userAuthObj.email,
          name: userAuthObj.name,
          token: userAuthObj.sessionToken,
          tokenExpiryTime: userAuthObj.tokenExpiryTime,
        })
      );

      // router("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message, { id: "exisiting-user-signin" });
    },
  });

  const onSubmit = useCallback(
    async function (values: TSignInFormSchema) {
      mutate(values);
    },
    [mutate]
  );

  return (
    <div className={cn("flex flex-col gap-6 w-[40vw]", className)} {...props}>
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
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm font-semibold text-white text-center w-full">
            Enter your email below to login to your FBI Most Wanted Watchlist
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signInForm}>
            <form>
              <FormField
                control={signInForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem
                    {...field}
                    className="flex flex-col items-center gap-2 mb-6"
                  >
                    <FormLabel className="text-blue-100 font-bold mb-2 w-full">
                      Email
                    </FormLabel>
                    <Input
                      className="bg-blue-950/20 border-blue-700/15"
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem
                    {...field}
                    className="flex flex-col items-center gap-2 mb-6"
                  >
                    <div className="flex flex-row justify-between w-full">
                      <FormLabel className="text-blue-100 font-bold mb-2">
                        Password
                      </FormLabel>
                      <a
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      className="bg-blue-950/20 border-blue-700/15"
                      id="password"
                      type="password"
                      {...field}
                    />
                  </FormItem>
                )}
              />

              <div className="flex flex-row flex-nowrap justify-between h-auto w-full mt-4">
                <Button
                  type="submit"
                  onClick={signInForm.handleSubmit(onSubmit)}
                  className="w-[200px] font-bold bg-white text-blue-700 hover:text-blue-300 hover:bg-blue-950"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader className="animate-spin text-blue-600" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <div className="mt-4 text-center text-sm">
                  Don't have an account?{" "}
                  <a
                    href="/sign-up"
                    className="underline underline-offset-4 font-bold"
                  >
                    Create an Account
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
