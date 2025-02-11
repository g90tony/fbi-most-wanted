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
import { Label } from "@/components/ui/label";
import logo from "../../assets/fbi-logo.png";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col items-start justify-center w-full">
                  <Label
                    className="text-blue-100 font-bold mb-2"
                    htmlFor="name"
                  >
                    Full Names
                  </Label>
                  <Input
                    className="bg-blue-950/20 border-blue-700/15"
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="flex flex-col items-start justify-center w-full">
                  <Label
                    className="text-blue-100 font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </Label>
                  <Input
                    className="bg-blue-950/20 border-blue-700/15"
                    id="username"
                    type="text"
                    placeholder="john_d"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center w-full">
                <Label className="text-blue-100 font-bold mb-2" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="bg-blue-950/20 border-blue-700/15"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col items-start justify-center w-full">
                  <div className="flex items-center">
                    <Label
                      className="text-blue-100 font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </Label>
                  </div>
                  <Input
                    className="bg-blue-950/20 border-blue-700/15"
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <div className="flex flex-col items-start justify-center w-full">
                  <div className="flex items-center">
                    <Label
                      className="text-blue-100 font-bold mb-2"
                      htmlFor="password"
                    >
                      Password Confirmation
                    </Label>
                  </div>
                  <Input
                    className="bg-blue-950/20 border-blue-700/15"
                    id="password"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row flex-nowrap justify-between h-auto w-full mt-4">
                <Button
                  type="submit"
                  className="w-[200px] font-bold bg-white text-blue-700 hover:text-blue-300 hover:bg-blue-950"
                >
                  Create Account
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
        </CardContent>
      </Card>
    </div>
  );
}
