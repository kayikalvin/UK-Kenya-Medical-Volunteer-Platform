import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("volunteers");
  const [volunteers, setVolunteers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();
  const { user, isSignedIn } = useUser(); // for user info
  const { getToken } = useAuth(); // for authentication token
  const { signOut } = useClerk();

  // Redirect non-admins
  useEffect(() => {
    if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
      navigate("/sign-in");
    }
  }, [isSignedIn, user, navigate]);

  // Fetch volunteers
  const fetchVolunteers = async () => {
    try {
      const token = await getToken(); // useAuth provides getToken
      const res = await fetch("http://localhost:5000/volunteers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch volunteers");
      const data = await res.json();
      setVolunteers(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (activeTab === "volunteers") fetchVolunteers();
  }, [activeTab]);

  // Verify volunteer
  const verifyVolunteer = async (id, status) => {
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/verify-volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: id, verificationStatus: status }),
      });
      if (!res.ok) throw new Error("Failed to verify volunteer");
      fetchVolunteers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Promote user to admin
  const promoteToAdmin = async () => {
    if (!selectedUser) return;
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/promote-to-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: selectedUser.id }),
      });
      if (!res.ok) throw new Error("Failed to promote user");
      alert(`${selectedUser.firstName} promoted to admin!`);
      setShowModal(false);
      setSelectedUser(null);
      fetchVolunteers();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <SignedIn>
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Back to Home
              </button>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 flex-wrap">
            {["volunteers", "hospitals", "clinicians"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded font-medium transition ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "volunteers" && (
            <div className="space-y-4">
              {volunteers.length === 0 ? (
                <p>No volunteers registered yet.</p>
              ) : (
                volunteers.map((v) => (
                  <div
                    key={v.id}
                    className="bg-white shadow p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-2"
                  >
                    <div>
                      <h3 className="font-bold text-lg">
                        {v.firstName} {v.lastName}
                      </h3>
                      <p>{v.profession}</p>
                      <p>Status: {v.verificationStatus || "pending"}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        onClick={() => verifyVolunteer(v.id, "verified")}
                      >
                        Approve
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        onClick={() => verifyVolunteer(v.id, "rejected")}
                      >
                        Reject
                      </button>
                      <button
                        className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                        onClick={() => {
                          setSelectedUser(v);
                          setShowModal(true);
                        }}
                      >
                        Promote to Admin
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "hospitals" && (
            <div className="bg-white shadow p-4 rounded">Hospital management coming soon</div>
          )}

          {activeTab === "clinicians" && (
            <div className="bg-white shadow p-4 rounded">Clinician management coming soon</div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
              <h2 className="text-lg font-bold mb-4">Confirm Promotion</h2>
              <p className="mb-6">
                Are you sure you want to promote{" "}
                <span className="font-semibold">
                  {selectedUser.firstName} {selectedUser.lastName}
                </span>{" "}
                to admin?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={promoteToAdmin}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  Yes, Promote
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <div className="p-6 text-center">
          <p className="text-red-600 font-bold">
            You must be signed in as an admin to view this page.
          </p>
        </div>
      </SignedOut>
    </div>
  );
}
