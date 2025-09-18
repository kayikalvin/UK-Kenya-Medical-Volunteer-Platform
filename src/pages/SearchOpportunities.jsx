import { useState, useEffect } from "react";
import Alert from "../components/Alert";

export default function SearchOpportunities({ hospitals }) {
  const [filters, setFilters] = useState({
    county: "",
    specialty: "",
    accommodation: "",
  });
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // initial display all verified hospitals
    setResults(hospitals.filter((h) => h.verified));
  }, [hospitals]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const searchOpportunities = () => {
    let filtered = hospitals.filter((h) => h.verified);

    if (filters.county) {
      filtered = filtered.filter((h) => h.county === filters.county);
    }

    if (filters.specialty) {
      const s = filters.specialty.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          (h.clinicalNeeds || "").toLowerCase().includes(s) ||
          (h.departments || []).some((d) => d.toLowerCase().includes(s))
      );
    }

    if (filters.accommodation) {
      filtered = filtered.filter((h) => h.accommodation === filters.accommodation);
    }

    if (filtered.length === 0) {
      setAlert({ type: "error", message: "No opportunities found matching your criteria." });
    } else {
      setAlert(null);
    }

    setResults(filtered);
  };

  const expressInterest = (hospital) => {
    setAlert({ type: "success", message: `Interest expressed for ${hospital.name}. The hospital will be notified.` });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Find Volunteer Opportunities</h2>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <select name="county" value={filters.county} onChange={handleChange} className="border p-2 rounded">
          <option value="">All Counties</option>
          <option>Nairobi</option>
          <option>Mombasa</option>
          <option>Kisumu</option>
          <option>Nakuru</option>
          <option>Uasin Gishu</option>
        </select>

        <input name="specialty" value={filters.specialty} onChange={handleChange} placeholder="Required Specialty (e.g., Surgery)" className="border p-2 rounded" />

        <select name="accommodation" value={filters.accommodation} onChange={handleChange} className="border p-2 rounded">
          <option value="">Any Accommodation</option>
          <option value="Yes">On-site available</option>
          <option value="Nearby">Nearby available</option>
        </select>
      </div>

      <div className="mb-4">
        <button onClick={searchOpportunities} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2">
          Search Opportunities
        </button>
        <button
          onClick={() => {
            setFilters({ county: "", specialty: "", accommodation: "" });
            setResults(hospitals.filter((h) => h.verified));
            setAlert(null);
          }}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {results.length === 0 ? (
          <div className="text-gray-500">No opportunities to show.</div>
        ) : (
          results.map((h) => (
            <div key={h.id} className="bg-slate-50 border rounded p-4">
              <h3 className="font-bold text-lg">{h.name}</h3>
              <p><strong>Type:</strong> {h.type}</p>
              <p><strong>Location:</strong> {h.county}</p>
              <p><strong>Beds:</strong> {h.beds || "Not specified"}</p>
              <p><strong>Contact:</strong> {h.contactPerson} ({h.contactTitle})</p>
              <p><strong>Email:</strong> {h.contactEmail}</p>
              <p><strong>Phone:</strong> {h.contactPhone}</p>
              <p><strong>GPS:</strong> {h.latitude}, {h.longitude}</p>
              <p><strong>Departments:</strong> {(h.departments || []).join(", ")}</p>
              <p><strong>Clinical Needs:</strong> {h.clinicalNeeds}</p>
              <p><strong>Accommodation:</strong> {h.accommodation || "Not specified"}</p>

              <div className="mt-3">
                <button onClick={() => expressInterest(h)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                  Express Interest
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
