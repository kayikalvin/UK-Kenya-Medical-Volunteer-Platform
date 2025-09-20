import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--foreground)]">
      <div className="w-full max-w-md p-6 bg-transparent rounded-lg shadow-md">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up" // This adds a "Sign Up" link if account doesn't exist
        />
      </div>
    </div>
  );
}
