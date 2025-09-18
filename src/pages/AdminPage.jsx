// // src/pages/AdminPage.jsx
// import { useState } from "react";
// import AdminVolunteers from "./AdminVolunteers";

// export default function AdminPage({ volunteers, setVolunteers }) {
//   const [activeAdminTab, setActiveAdminTab] = useState("volunteers");

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setActiveAdminTab("volunteers")}
//           className={`px-4 py-2 rounded ${
//             activeAdminTab === "volunteers"
//               ? "bg-indigo-600 text-white"
//               : "bg-gray-200 text-gray-800"
//           }`}
//         >
//           Volunteers
//         </button>
//         <button
//           onClick={() => setActiveAdminTab("hospitals")}
//           className={`px-4 py-2 rounded ${
//             activeAdminTab === "hospitals"
//               ? "bg-indigo-600 text-white"
//               : "bg-gray-200 text-gray-800"
//           }`}
//         >
//           Hospitals
//         </button>
//         <button
//           onClick={() => setActiveAdminTab("clinicians")}
//           className={`px-4 py-2 rounded ${
//             activeAdminTab === "clinicians"
//               ? "bg-indigo-600 text-white"
//               : "bg-gray-200 text-gray-800"
//           }`}
//         >
//           Clinicians
//         </button>
//       </div>

//       {activeAdminTab === "volunteers" && (
//         <AdminVolunteers volunteers={volunteers} setVolunteers={setVolunteers} />
//       )}

//       {activeAdminTab === "hospitals" && (
//         <div className="bg-white shadow rounded p-4">
//           <p>Hospital management panel (coming soon)</p>
//         </div>
//       )}

//       {activeAdminTab === "clinicians" && (
//         <div className="bg-white shadow rounded p-4">
//           <p>Clinician management panel (coming soon)</p>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";

export default function AdminPage({ volunteers, setVolunteers }) {
  const [activeTab, setActiveTab] = useState("volunteers");

  const verifyVolunteer = (id, status) => {
    const updated = volunteers.map((v) =>
      v.id === id ? { ...v, verificationStatus: status } : v
    );
    setVolunteers(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("volunteers")}
          className={`px-4 py-2 rounded ${
            activeTab === "volunteers"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Volunteers
        </button>
        <button
          onClick={() => setActiveTab("hospitals")}
          className={`px-4 py-2 rounded ${
            activeTab === "hospitals"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Hospitals
        </button>
        <button
          onClick={() => setActiveTab("clinicians")}
          className={`px-4 py-2 rounded ${
            activeTab === "clinicians"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Clinicians
        </button>
      </div>

      {activeTab === "volunteers" && (
        <div className="space-y-4">
          {volunteers.length === 0 ? (
            <p>No volunteers registered yet.</p>
          ) : (
            volunteers.map((v) => (
              <div
                key={v.id}
                className="bg-white shadow p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">
                    {v.firstName} {v.lastName}
                  </h3>
                  <p>{v.profession}</p>
                  <p>Status: {v.verificationStatus || "pending"}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => verifyVolunteer(v.id, "verified")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => verifyVolunteer(v.id, "rejected")}
                  >
                    Reject
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
  );
}
