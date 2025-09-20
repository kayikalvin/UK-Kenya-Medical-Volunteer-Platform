import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const role = user?.publicMetadata?.role; // "admin" or "volunteer"

  const tabs = [
    { path: "/", label: "Home" },
    { path: "/clinician-register", label: "Clinician Registration" },
    { path: "/hospital-register", label: "Hospital Registration" },
    { path: "/verify-credentials", label: "Verify Credentials" },
    { path: "/search-opportunities", label: "Find Opportunities" },
    { path: "/search-volunteers", label: "Find Clinicians" },
    { path: "/volunteer-register", label: "Volunteer Register" },
  ];

  const renderLink = (tab, extraClasses = "") => (
    <NavLink
      key={tab.path}
      to={tab.path}
      onClick={() => setIsOpen(false)}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-md transition font-semibold md:text-sm ${
          isActive
            ? "bg-[var(--primary)] text-[var(--text)]"
            : "text-[var(--text)] hover:bg-[var(--primary-foreground)] hover:text-[var(--background)]"
        } ${extraClasses}`
      }
    >
      {tab.label}
    </NavLink>
  );

  return (
    <nav className="w-full z-50 bg-[var(--foreground)] font-bold shadow-md h-[100px] flex justify-around items-center">
      {/* Top Bar: Logo + Hamburger */}
      <div className="flex items-center justify-between px-4 py-3 md:justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center md:mr-20">
          <span className="text-[var(--text)] font-bold text-2xl">
            Anchored Health
          </span>
        </NavLink>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[var(--text)] focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Links & Auth */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {/* Links */}
          <ul className="flex justify-center items-center space-x-3">
            {tabs.map((tab) =>
              renderLink(tab, "hover:scale-105 hover:bg-[var(--accent-foreground)]")
            )}
            {role === "admin" &&
              renderLink(
                { path: "/admin", label: "Admin Panel" },
                "bg-[var(--accent)] hover:text-[var(--text)]"
              )}
          </ul>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <NavLink
                to="/sign-up"
                className="px-3 py-2 rounded-md bg-[var(--primary)]  text-[var(--background)] hover:scale-105 hover:bg-[var(--text)] transition"
              >
                Get Started
              </NavLink>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-[var(--primary)] bg-opacity-95 flex flex-col items-center justify-center space-y-6 md:hidden z-50 transition-all">
          {tabs.map((tab) => renderLink(tab, "text-xl text-[var(--background)]"))}
          {role === "admin" &&
            renderLink(
              { path: "/admin", label: "Admin Panel" },
              "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--background)] text-xl"
            )}

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <NavLink
              to="/sign-up"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 rounded-md bg-[var(--success)] text-[var(--background)] hover:bg-[var(--success-hover)] text-xl"
            >
              Get Started
            </NavLink>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
