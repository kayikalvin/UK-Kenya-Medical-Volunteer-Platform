import { useState } from "react";
import Alert from "../components/Alert";

export default function AdminVolunteers({ volunteers, setVolunteers }) {
  const [alert, setAlert] = useState(null);

  const updateStatus = (id, status, notes = "") => {
    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, verificationStatus: status, verificationDate: new Date().toISOString(), verificationNotes: notes }
          : v
      )
    );
    setAlert({ type: "success", message: `Volunteer ${status}` });
  };

  const pending = volunteers.filter((v) => v.verificationStatus === "pending");
  const completed = volunteers.filter((v) => v.verificationStatus !== "pending");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Admin: Volunteer Verification</h2>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <h3 className="font-semibold mb-2">Pending Verifications</h3>
      {pending.length === 0 ? (
        <p className="text-gray-500">No pending volunteers</p>
      ) : (
        pending.map((v) => (
          <div key={v.id} className="border p-4 rounded mb-3 bg-slate-50">
            <h4 className="font-bold">{v.firstName} {v.lastName}</h4>
            <p><strong>Profession:</strong> {v.profession}</p>
            <p><strong>Registration:</strong> {v.registrationNumber}</p>
            <textarea placeholder="Verification notes" className="border p-2 rounded w-full mt-2" id={`notes-${v.id}`} />
            <div className="mt-2 flex gap-2">
              <button onClick={() => updateStatus(v.id, "verified", document.getElementById(`notes-${v.id}`).value)} className="bg-green-600 text-white px-3 py-1 rounded">Approve</button>
              <button onClick={() => updateStatus(v.id, "rejected", document.getElementById(`notes-${v.id}`).value)} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
            </div>
          </div>
        ))
      )}

      <h3 className="font-semibold mt-6 mb-2">Completed Verifications</h3>
      {completed.length === 0 ? (
        <p className="text-gray-500">No completed verifications</p>
      ) : (
        completed.map((v) => (
          <div key={v.id} className="border p-4 rounded mb-3 bg-white">
            <h4 className="font-bold">{v.firstName} {v.lastName}</h4>
            <p><strong>Status:</strong> {v.verificationStatus}</p>
            <p><strong>Date:</strong> {v.verificationDate}</p>
            {v.verificationNotes && <p><strong>Notes:</strong> {v.verificationNotes}</p>}
          </div>
        ))
      )}
    </div>
  );
}
