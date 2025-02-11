import { LoginForm } from "@/components/forms/login";

export default function SignInPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex flex-col w-full max-w-sm items-center gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
