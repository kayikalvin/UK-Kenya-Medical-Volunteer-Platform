import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ currentUser, setCurrentUser, adminUser, setAdminUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { path: "/", label: "Home" },
    { path: "/clinician-register", label: "Clinician Registration" },
    { path: "/hospital-register", label: "Hospital Registration" },
    { path: "/verify-credentials", label: "Verify Credentials" },
    { path: "/search-opportunities", label: "Find Opportunities" },
    { path: "/search-volunteers", label: "Find Clinicians" },
    { path: "/volunteer-register", label: "Volunteer Register" },
  ];

  const handleLogout = (type) => {
    if (type === "volunteer") {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      navigate("/");
    }
    if (type === "admin") {
      setAdminUser(null);
      localStorage.removeItem("adminUser");
      navigate("/");
    }
  };

  return (
<nav className="absolute top-0 left-0 w-full z-50 bg-purple-800 md:sticky md:top-0 md:p-4 font-bold">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex md:flex-row md:justify-center md:items-center">
        {tabs.map((tab) => (
          <li key={tab.path} className="mx-2">
            <NavLink
              to={tab.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-white hover:bg-white hover:text-blue-700 transition ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
        {currentUser && (
          <li className="mx-2">
            <button
              onClick={() => handleLogout("volunteer")}
              className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Logout (Volunteer)
            </button>
          </li>
        )}
        {adminUser && (
          <li className="mx-2">
            <button
              onClick={() => handleLogout("admin")}
              className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Logout (Admin)
            </button>
          </li>
        )}
      </ul>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-95 flex flex-col items-center justify-center space-y-6 md:hidden">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 rounded-md text-white text-xl font-semibold hover:bg-white hover:text-blue-700 transition ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}

          {currentUser && (
            <button
              onClick={() => {
                handleLogout("volunteer");
                setIsOpen(false);
              }}
              className="px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 text-xl"
            >
              Logout (Volunteer)
            </button>
          )}

          {adminUser && (
            <button
              onClick={() => {
                handleLogout("admin");
                setIsOpen(false);
              }}
              className="px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 text-xl"
            >
              Logout (Admin)
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
