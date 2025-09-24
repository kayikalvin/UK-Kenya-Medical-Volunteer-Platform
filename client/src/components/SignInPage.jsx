import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl={window.location.origin + "/sign-up"}
        afterSignInUrl={window.location.origin + "/"}   // 👈 redirect here
      />
    </div>
  );
}
