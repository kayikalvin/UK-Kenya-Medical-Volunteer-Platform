import { useState } from "react";
import Alert from "../components/Alert";

export default function VerifyCredentials({ clinicians, setClinicians, verifications, setVerifications }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [verifierName, setVerifierName] = useState("");
  const [verifierOrg, setVerifierOrg] = useState("");
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState(null);

  const handleSearch = () => {
    if (!searchTerm || !verifierOrg) {
      setAlert({ type: "error", message: "Please enter search criteria and select your organization." });
      return;
    }

    const term = searchTerm.toLowerCase();
    const found = clinicians.filter((c) =>
      (c.gmcNumber || "").toLowerCase().includes(term) ||
      (c.email || "").toLowerCase().includes(term) ||
      (`${c.firstName} ${c.lastName}`.toLowerCase()).includes(term)
    );

    if (found.length === 0) {
      setResults([]);
      setAlert({ type: "error", message: "No clinicians found matching your search criteria." });
      return;
    }

    setResults(found);
  };

  const verifyCredentials = (clinicianId) => {
    setClinicians((prev) =>
      prev.map((c) =>
        c.id === clinicianId ? { ...c, verificationStatus: "verified", verifiedDate: new Date().toISOString(), verifiedBy: verifierOrg } : c
      )
    );

    setVerifications([
      ...verifications,
      {
        clinicianId,
        verifierName,
        verifierOrg,
        verificationDate: new Date().toISOString(),
        status: "verified",
      },
    ]);

    setAlert({ type: "success", message: "Credentials verified successfully!" });

    // refresh results to show new status
    setResults((prev) => prev.map((c) => (c.id === clinicianId ? { ...c, verificationStatus: "verified" } : c)));
  };

  const flagCredentials = (clinicianId) => {
    setClinicians((prev) => prev.map((c) => (c.id === clinicianId ? { ...c, verificationStatus: "flagged" } : c)));
    setAlert({ type: "success", message: "Credentials flagged for review." });
    setResults((prev) => prev.map((c) => (c.id === clinicianId ? { ...c, verificationStatus: "flagged" } : c)));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Credential Verification</h2>
      <p className="text-gray-600 mb-4">For authorized bodies to verify UK clinician credentials and professional registrations.</p>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <input
          value={verifierName}
          onChange={(e) => setVerifierName(e.target.value)}
          placeholder="Verifier Name *"
          className="border p-2 rounded"
        />
        <select value={verifierOrg} onChange={(e) => setVerifierOrg(e.target.value)} className="border p-2 rounded">
          <option value="">Select Organization *</option>
          <option value="GMC">General Medical Council (GMC)</option>
          <option value="NMC">Nursing and Midwifery Council (NMC)</option>
          <option value="RCGP">Royal College of General Practitioners</option>
          <option value="BMA">British Medical Association</option>
          <option value="NHS Trust">NHS Trust</option>
          <option value="Kenya Medical Board">Kenya Medical Practitioners Board</option>
          <option value="Other">Other Authorized Body</option>
        </select>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter GMC/NMC number, name, or email"
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mr-2">
          Search
        </button>
        <button onClick={() => { setResults([]); setSearchTerm(""); }} className="bg-gray-200 px-4 py-2 rounded">
          Clear
        </button>
      </div>

      <div>
        {results.length === 0 ? (
          <div className="text-gray-500">No results to display.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {results.map((clinician) => (
              <div key={clinician.id} className="bg-slate-50 border rounded p-4">
                <h4 className="font-bold text-lg">{clinician.title} {clinician.firstName} {clinician.lastName}</h4>
                <p><strong>Email:</strong> {clinician.email}</p>
                <p><strong>Profession:</strong> {clinician.profession}</p>
                <p><strong>Specialty:</strong> {clinician.specialty}</p>
                <p><strong>GMC/NMC Number:</strong> {clinician.gmcNumber}</p>
                <p><strong>Current Employer:</strong> {clinician.employer}</p>
                <p className="mt-2">
                  <strong>Status:</strong> <span className={`inline-block px-2 py-1 rounded text-sm ${clinician.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' : clinician.verificationStatus === 'flagged' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{clinician.verificationStatus}</span>
                </p>

                <div className="mt-3">
                  <button onClick={() => verifyCredentials(clinician.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2">
                    Verify Credentials
                  </button>
                  <button onClick={() => flagCredentials(clinician.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                    Flag Issue
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
