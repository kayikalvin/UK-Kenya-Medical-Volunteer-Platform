import { useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Dashboard({ currentUser }) {
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        Please register to view your dashboard.
        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const verificationStatus = currentUser?.verificationStatus || "PENDING";
  const registrationDate = currentUser?.registrationDate
    ? new Date(currentUser.registrationDate).toLocaleDateString()
    : "N/A";
  const verificationNotes = currentUser?.verificationNotes || "";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Volunteer Dashboard</h2>
        {/* Sign out button */}
        <UserButton />
      </div>

      <div>
        <h3 className="font-semibold">Registration Status</h3>
        <p>Registered on: {registrationDate}</p>
      </div>

      <div>
        <h3 className="font-semibold">Verification Status</h3>
        <p
          className={
            verificationStatus === "verified"
              ? "text-green-600"
              : verificationStatus === "rejected"
              ? "text-red-600"
              : "text-yellow-600"
          }
        >
          {verificationStatus.toUpperCase()}
        </p>
        {verificationNotes && <p>Notes: {verificationNotes}</p>}
      </div>

      <div>
        <h3 className="font-semibold">Current Assignments</h3>
        <p>No active assignments yet</p>
      </div>

      <div>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
