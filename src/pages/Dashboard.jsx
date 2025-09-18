export default function Dashboard({ currentUser }) {
  if (!currentUser) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Please register to view your dashboard.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Volunteer Dashboard</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Registration Status</h3>
        <p>Registered on: {new Date(currentUser.registrationDate).toLocaleDateString()}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Verification Status</h3>
        <p className={currentUser.verificationStatus === "verified" ? "text-green-600" : currentUser.verificationStatus === "rejected" ? "text-red-600" : "text-yellow-600"}>
          {currentUser.verificationStatus.toUpperCase()}
        </p>
        {currentUser.verificationNotes && <p>Notes: {currentUser.verificationNotes}</p>}
      </div>

      <div>
        <h3 className="font-semibold">Current Assignments</h3>
        <p>No active assignments yet</p>
      </div>
    </div>
  );
}
