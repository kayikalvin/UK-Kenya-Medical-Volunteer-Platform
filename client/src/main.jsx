import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.jsx";
import "./index.css";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkFrontendApi}
      navigate={(to) => window.history.pushState(null, "", to)}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
