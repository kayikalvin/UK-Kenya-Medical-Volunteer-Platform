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
    setResults(hospitals.filter((h) => h.verified));
  }, [hospitals]);

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
    <div className="bg-[var(--background)] text-[var(--muted-foreground)] p-8 rounded-2xl shadow-white/20 max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">Find Volunteer Opportunities</h2>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <select
          name="county"
          value={filters.county}
          onChange={handleChange}
          className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        >
          <option value="">All Counties</option>
          <option>Baringo</option>
          <option>Bomet</option>
          <option>Bungoma</option>
          <option>Busia</option>
          <option>Elgeyo-Marakwet</option>
          <option>Embu</option>
          <option>Garissa</option>
          <option>Homa Bay</option>
          <option>Isiolo</option>
          <option>Kajiado</option>
          <option>Kakamega</option>
          <option>Kericho</option>
          <option>Kiambu</option>
          <option>Kilifi</option>
          <option>Kirisii</option>
          <option>Kisii</option>
          <option>Kisumu</option>
          <option>Kitui</option>
          <option>Kwale</option>
          <option>Laikipia</option>
          <option>Lamu</option>
          <option>Machakos</option>
          <option>Makueni</option>
          <option>Mandera</option>
          <option>Meru</option>
          <option>Migori</option>
          <option>Marsabit</option>
          <option>Mombasa</option>
          <option>Nairobi</option>
          <option>Nakuru</option>
          <option>Nandi</option>
          <option>Nyamira</option>
          <option>Nyandarua</option>
          <option>Nyang’oma</option>
          <option>Siaya</option>
          <option>Taita-Taveta</option>
          <option>Tana River</option>
          <option>Tharaka-Nithi</option>
          <option>Trans-Nzoia</option>
          <option>Turkana</option>
          <option>Uasin Gishu</option>
          <option>Vihiga</option>
          <option>Wajir</option>
          <option>West Pokot</option>

        </select>

        <input
          name="specialty"
          value={filters.specialty}
          onChange={handleChange}
          placeholder="Required Specialty (e.g., Surgery)"
          className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />

        <select
          name="accommodation"
          value={filters.accommodation}
          onChange={handleChange}
          className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        >
          <option value="">Any Accommodation</option>
          <option value="Yes">On-site available</option>
          <option value="Nearby">Nearby available</option>
        </select>
      </div>

      <div className="mb-6 flex gap-3">
        <button
          onClick={searchOpportunities}
          className="bg-[var(--secondary)] hover:bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg shadow-white/20 transition"
        >
          Search Opportunities
        </button>
        <button
          onClick={() => {
            setFilters({ county: "", specialty: "", accommodation: "" });
            setResults(hospitals.filter((h) => h.verified));
            setAlert(null);
          }}
          className="bg-[var(--accent)] hover:bg-[var(--border)] text-[var(--muted-foreground)] px-4 py-2 rounded-lg transition"
        >
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {results.length === 0 ? (
          <div className="text-[var(--muted-foreground)]">No opportunities to show.</div>
        ) : (
          results.map((h) => (
            <div
              key={h.id}
              className="bg-[var(--accent)] border border-[var(--border)] rounded-2xl p-5 shadow-white/10"
            >
              <h3 className="font-bold text-xl mb-2">{h.name}</h3>
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

              <div className="mt-4">
                <button
                  onClick={() => expressInterest(h)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-white/10 transition"
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
