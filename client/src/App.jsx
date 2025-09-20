import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

// Public Pages
import Home from "./pages/Home";
import ClinicianRegister from "./pages/ClinicianRegister";
import HospitalRegister from "./pages/HospitalRegister";
import VerifyCredentials from "./pages/VerifyCredentials";
import SearchOpportunities from "./pages/SearchOpportunities";
import SearchVolunteers from "./pages/SearchVolunteers";
import VolunteerRegister from "./pages/VolunteerRegister";

// Private Pages
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";

// --- Layouts ---
function PublicLayout() {
  return (
    <div className="h-[100%] overflow-x-hidden px-0 md:px-0 flex flex-col w-full md:max-w-[896px] lg:max-w-full mx-auto">
      {/* <Header /> */}
      <Navbar />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="h-[calc(100vh-100px)] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Outlet />
    </div>
  );
}

// --- Admin Guard ---
function AdminGuard({ children }) {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <RedirectToSignIn />;

  const role = user.publicMetadata?.role;
  if (role !== "admin") return <RedirectToSignIn />;

  return <>{children}</>; // render wrapped children
}

// --- Main App ---
export default function App() {
  const [hospitals, setHospitals] = useState([]);
  const [clinicians, setClinicians] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const { user } = useUser();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "clinician-register", element: <ClinicianRegister /> },
        { path: "hospital-register", element: <HospitalRegister /> },
        { path: "verify-credentials", element: <VerifyCredentials /> },
        { path: "search-opportunities", element: <SearchOpportunities hospitals={hospitals} /> },
        { path: "search-volunteers", element: <SearchVolunteers clinicians={clinicians} /> },
        { path: "volunteer-register", element: <VolunteerRegister /> },
      ],
    },

    // Volunteer Dashboard (protected)
    {
      path: "/dashboard",
      element: (
        <SignedIn>
          <DashboardLayout />
        </SignedIn>
      ),
      children: [
        {
          index: true,
          element: <Dashboard currentUser={user} />,
        },
      ],
    },

    // Admin Panel (protected)
    {
      path: "/admin",
      element: (
      
            <DashboardLayout />
         
      ),
      children: [
        {
          index: true,
          element: <AdminPage volunteers={volunteers} setVolunteers={setVolunteers} />,
        },
      ],
    },

    // Auth routes
    { path: "/sign-in", element: <SignInPage routing="path" path="/sign-in"  /> },
    { path: "/sign-up", element: <SignUpPage routing="path" path="/sign-up" /> },
  ]);

  return <RouterProvider router={router} />;
}
