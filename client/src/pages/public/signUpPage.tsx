import { SignUpForm } from "@/components/forms/signup";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex flex-col w-full lg:max-w-sm items-center gap-6">
        <SignUpForm />
      </div>
    </div>
  );
}
