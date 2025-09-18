// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Home from "./pages/Home";
// import ClinicianRegister from "./pages/ClinicianRegister";
// import HospitalRegister from "./pages/HospitalRegister";
// import VerifyCredentials from "./pages/VerifyCredentials";
// import SearchOpportunities from "./pages/SearchOpportunities";
// import SearchVolunteers from "./pages/SearchVolunteers";
// import VolunteerRegister from "./pages/VolunteerRegister";
// import Dashboard from "./pages/Dashboard";
// import AdminPage from "./pages/AdminPage";
// import AdminLogin from "./pages/AdminLogin";

// export default function App() {
//   const [clinicians, setClinicians] = useState([]);
//   const [hospitals, setHospitals] = useState([]);
//   const [verifications, setVerifications] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null); // volunteer
//   const [adminUser, setAdminUser] = useState(null); // admin

//   // Load from localStorage on mount
//   useEffect(() => {
//     const savedClinicians = localStorage.getItem("clinicians");
//     const savedHospitals = localStorage.getItem("hospitals");
//     const savedVolunteers = localStorage.getItem("volunteers");
//     const savedUser = localStorage.getItem("currentUser");
//     const savedAdmin = localStorage.getItem("adminUser");

//     if (savedClinicians) setClinicians(JSON.parse(savedClinicians));
//     if (savedHospitals) setHospitals(JSON.parse(savedHospitals));
//     if (savedVolunteers) setVolunteers(JSON.parse(savedVolunteers));
//     if (savedUser) setCurrentUser(JSON.parse(savedUser));
//     if (savedAdmin) setAdminUser(JSON.parse(savedAdmin));
//   }, []);

//   // Save to localStorage whenever state changes
//   useEffect(() => {
//     localStorage.setItem("clinicians", JSON.stringify(clinicians));
//   }, [clinicians]);

//   useEffect(() => {
//     localStorage.setItem("hospitals", JSON.stringify(hospitals));
//   }, [hospitals]);

//   useEffect(() => {
//     localStorage.setItem("volunteers", JSON.stringify(volunteers));
//   }, [volunteers]);

//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem("currentUser", JSON.stringify(currentUser));
//     } else {
//       localStorage.removeItem("currentUser");
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     if (adminUser) {
//       localStorage.setItem("adminUser", JSON.stringify(adminUser));
//     } else {
//       localStorage.removeItem("adminUser");
//     }
//   }, [adminUser]);

//   function Layout() {
//   return (
//     <div className="h-screen overflow-x-hidden px-5 md:px-0 flex flex-col max-w-full md:max-w-[896px] lg:max-w-[1366px] mx-auto">
//       <Navbar />
//       <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
//       <div className="h-[calc(100vh-100px)]">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 text-gray-800">
//         <Header />
//         <Navbar
//           currentUser={currentUser}
//           setCurrentUser={setCurrentUser}
//           adminUser={adminUser}
//           setAdminUser={setAdminUser}
//         />

//         <main className="container mx-auto px-4 py-6">
//           <Routes>
//             <Route path="/" element={<Home />} />

//             <Route
//               path="/clinician-register"
//               element={
//                 <ClinicianRegister
//                   clinicians={clinicians}
//                   setClinicians={setClinicians}
//                 />
//               }
//             />
//             <Route
//               path="/hospital-register"
//               element={
//                 <HospitalRegister
//                   hospitals={hospitals}
//                   setHospitals={setHospitals}
//                 />
//               }
//             />
//             <Route
//               path="/verify-credentials"
//               element={
//                 <VerifyCredentials
//                   clinicians={clinicians}
//                   setClinicians={setClinicians}
//                   verifications={verifications}
//                   setVerifications={setVerifications}
//                 />
//               }
//             />
//             <Route
//               path="/search-opportunities"
//               element={<SearchOpportunities hospitals={hospitals} />}
//             />
//             <Route
//               path="/search-volunteers"
//               element={<SearchVolunteers clinicians={clinicians} />}
//             />
//             <Route
//               path="/volunteer-register"
//               element={
//                 <VolunteerRegister
//                   volunteers={volunteers}
//                   setVolunteers={setVolunteers}
//                   setCurrentUser={setCurrentUser}
//                 />
//               }
//             />

//             {/* Volunteer Dashboard (protected) */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute
//                   isAllowed={!!currentUser}
//                   redirectTo="/volunteer-register"
//                 >
//                   <Dashboard currentUser={currentUser} />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Admin Login + Protected Panel */}
//             <Route
//               path="/admin-login"
//               element={<AdminLogin setAdminUser={setAdminUser} />}
//             />
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute isAllowed={!!adminUser} redirectTo="/admin-login">
//                   <AdminPage
//                     volunteers={volunteers}
//                     setVolunteers={setVolunteers}
//                   />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";
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
import Adminlogin from "./pages/Adminlogin";
import { useEffect, useState } from "react";

// Layout for public pages
function PublicLayout({ currentUser, setCurrentUser, adminUser, setAdminUser }) {
  return (
    <div className="h-screen overflow-x-hidden px-0 md:px-0 flex flex-col w-full md:max-w-[896px] lg:max-w-full mx-auto">
      <Header />
      <Navbar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        adminUser={adminUser}
        setAdminUser={setAdminUser}
      />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="h-[calc(100vh-100px)] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

// Layout for dashboards (no header/navbar)
function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Outlet />
    </div>
  );
}

export default function App() {
  // --- State (moved here for clarity, same as your old App.jsx) ---
  const [clinicians, setClinicians] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedAdmin = localStorage.getItem("adminUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedAdmin) setAdminUser(JSON.parse(savedAdmin));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicLayout
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          adminUser={adminUser}
          setAdminUser={setAdminUser}
        />
      ),
      children: [
        { index: true, element: <Home /> },
        {
          path: "clinician-register",
          element: (
            <ClinicianRegister
              clinicians={clinicians}
              setClinicians={setClinicians}
            />
          ),
        },
        {
          path: "hospital-register",
          element: (
            <HospitalRegister
              hospitals={hospitals}
              setHospitals={setHospitals}
            />
          ),
        },
        {
          path: "verify-credentials",
          element: (
            <VerifyCredentials
              clinicians={clinicians}
              setClinicians={setClinicians}
              verifications={verifications}
              setVerifications={setVerifications}
            />
          ),
        },
        {
          path: "search-opportunities",
          element: <SearchOpportunities hospitals={hospitals} />,
        },
        {
          path: "search-volunteers",
          element: <SearchVolunteers clinicians={clinicians} />,
        },
        {
          path: "volunteer-register",
          element: (
            <VolunteerRegister
              volunteers={volunteers}
              setVolunteers={setVolunteers}
              setCurrentUser={setCurrentUser}
            />
          ),
        },
      ],
    },

    // Volunteer Dashboard (protected, no header/navbar)
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute isAllowed={!!currentUser} redirectTo="/volunteer-register">
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [{ index: true, element: <Dashboard currentUser={currentUser} /> }],
    },

    // Admin routes (no header/navbar)
    { path: "/admin-login", element: <Adminlogin setAdminUser={setAdminUser} /> },
    {
      path: "/admin",
      element: (
        <ProtectedRoute isAllowed={!!adminUser} redirectTo="/admin-login">
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <AdminPage volunteers={volunteers} setVolunteers={setVolunteers} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
