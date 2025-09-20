import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--foreground)]">
      <div className="w-full max-w-md p-6 bg-transparent rounded-lg shadow-md">
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
