import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl={window.location.origin + "/"}
        afterSignInUrl={window.location.origin + "/"}
        // 👇 Add custom field for role
        signUpFields={[
          {
            type: "select",
            id: "role",
            label: "Registering as",
            options: [
              { value: "organization", label: "Organization" },
              { value: "professional", label: "Professional" },
            ],
          },
        ]}
      />
    </div>
  );
}
