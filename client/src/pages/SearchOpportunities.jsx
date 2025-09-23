import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import Alert from "../components/Alert";

export default function SearchOpportunities() {
  const { getToken } = useAuth(); // 🔑 get Clerk token
  const [filters, setFilters] = useState({
    county: "",
    specialty: "",
    accommodation: "",
  });
  const [results, setResults] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [alert, setAlert] = useState(null);

  // Fetch hospitals from backend with token
  useEffect(() => {
  const fetchHospitals = async () => {
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/api/hospitals/public", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch hospitals");
      const data = await res.json();
      setHospitals(data);
      setResults(data); // 👈 don’t filter by verified
    } catch (err) {
      console.error("Error fetching hospitals:", err);
      setAlert({ type: "error", message: "Unable to load hospitals." });
    }
  };

  fetchHospitals();
}, [getToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const searchOpportunities = () => {
    let filtered = hospitals.filter((h) => h.verified);

    if (filters.county) filtered = filtered.filter((h) => h.county === filters.county);

    if (filters.specialty) {
      const s = filters.specialty.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          (h.clinicalNeeds || "").toLowerCase().includes(s) ||
          (h.departments || []).some((d) => d.toLowerCase().includes(s))
      );
    }

    if (filters.accommodation)
      filtered = filtered.filter((h) => h.accommodation === filters.accommodation);

    if (filtered.length === 0) {
      setAlert({ type: "error", message: "No opportunities found matching your criteria." });
    } else {
      setAlert(null);
    }

    setResults(filtered);
  };

  const expressInterest = (hospital) => {
    setAlert({
      type: "success",
      message: `Interest expressed for ${hospital.name}. The hospital will be notified.`,
    });
  };

  return (
    <div className="bg-[var(--background)] text-[var(--muted-foreground)] p-8 rounded-2xl shadow-white/20 max-w-7xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">Find Volunteer Opportunities</h2>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <select
          name="county"
          value={filters.county}
          onChange={handleChange}
          className="bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
        >
          <option value="">All Counties</option>
          <option>Nairobi</option>
          <option>Kisumu</option>
          <option>Mombasa</option>
          {/* add more counties */}
        </select>

        <input
          name="specialty"
          value={filters.specialty}
          onChange={handleChange}
          placeholder="Required Specialty (e.g., Surgery)"
          className="bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
        />

        <select
          name="accommodation"
          value={filters.accommodation}
          onChange={handleChange}
          className="bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
        >
          <option value="">Any Accommodation</option>
          <option value="Yes">On-site available</option>
          <option value="Nearby">Nearby available</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={searchOpportunities}
          className="bg-[var(--secondary)] hover:bg-[var(--primary)] text-white px-4 py-2 rounded-lg"
        >
          Search Opportunities
        </button>
        <button
          onClick={() => {
            setFilters({ county: "", specialty: "", accommodation: "" });
            setResults(hospitals.filter((h) => h.verified));
            setAlert(null);
          }}
          className="bg-[var(--accent)] hover:bg-[var(--border)] text-gray-700 px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-6">
        {results.length === 0 ? (
          <div>No opportunities to show.</div>
        ) : (
          results.map((h) => (
            <div
              key={h._id}
              className="bg-[var(--accent)] border border-[var(--border)] rounded-2xl p-5 shadow"
            >
              <h3 className="font-bold text-xl mb-2">{h.name}</h3>
              <p><strong>Type:</strong> {h.type}</p>
              <p><strong>Location:</strong> {h.county}</p>
              <p><strong>Beds:</strong> {h.beds || "Not specified"}</p>
              <p><strong>Contact:</strong> {h.contactPerson} ({h.contactTitle})</p>
              <p><strong>Email:</strong> {h.contactEmail}</p>
              <p><strong>Phone:</strong> {h.contactPhone}</p>
              <p><strong>Departments:</strong> {(h.departments || []).join(", ")}</p>
              <p><strong>Clinical Needs:</strong> {h.clinicalNeeds}</p>
              <p><strong>Accommodation:</strong> {h.accommodation || "Not specified"}</p>

              <div className="mt-4">
                <button
                  onClick={() => expressInterest(h)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
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
