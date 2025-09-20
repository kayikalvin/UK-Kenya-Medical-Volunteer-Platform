import { useState, useEffect } from "react";
import Alert from "../components/Alert";

export default function SearchVolunteers({ clinicians }) {
  const [filters, setFilters] = useState({
    specialty: "",
    profession: "",
    minExperience: "",
  });
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setResults(clinicians.filter((c) => c.verificationStatus === "verified"));
  }, [clinicians]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const searchVolunteers = () => {
    let filtered = clinicians.filter((c) => c.verificationStatus === "verified");

    if (filters.specialty) {
      const s = filters.specialty.toLowerCase();
      filtered = filtered.filter((c) => (c.specialty || "").toLowerCase().includes(s));
    }

    if (filters.profession) {
      filtered = filtered.filter((c) => c.profession === filters.profession);
    }

    if (filters.minExperience) {
      filtered = filtered.filter(
        (c) => parseInt(c.experience || "0", 10) >= parseInt(filters.minExperience || "0", 10)
      );
    }

    if (filtered.length === 0) {
      setAlert({ type: "error", message: "No verified volunteers found matching your criteria." });
    } else {
      setAlert(null);
    }

    setResults(filtered);
  };

  const contactVolunteer = (c) => {
    setAlert({ type: "success", message: `Contact details: ${c.email} | ${c.phone}` });
  };

  return (
    <div className="bg-[var(--background)] text-[var(--muted-foreground)] p-8 rounded-2xl shadow-white/20 max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">Find Volunteer Clinicians</h2>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          name="specialty"
          value={filters.specialty}
          onChange={handleChange}
          placeholder="Specialty (e.g., Cardiology)"
          className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />
        <select
          name="profession"
          value={filters.profession}
          onChange={handleChange}
          className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        >
          <option value="">All Professions</option>
          <option>Doctor</option>
          <option>Nurse</option>
          <option>Surgeon</option>
          <option>Specialist</option>
        </select>
        <input
          name="minExperience"
          value={filters.minExperience}
          onChange={handleChange}
          type="number"
          min="0"
          placeholder="Min experience (years)"
          className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />
      </div>

      <div className="mb-6 flex gap-3">
        <button
          onClick={searchVolunteers}
          className="bg-[var(--secondary)] hover:bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg shadow-white/20 transition"
        >
          Search Volunteers
        </button>
        <button
          onClick={() => {
            setFilters({ specialty: "", profession: "", minExperience: "" });
            setResults(clinicians.filter((c) => c.verificationStatus === "verified"));
            setAlert(null);
          }}
          className="bg-[var(--accent)] hover:bg-[var(--border)] text-[var(--muted-foreground)] px-4 py-2 rounded-lg transition"
        >
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {results.length === 0 ? (
          <div className="text-[var(--muted-foreground)]">No volunteers to show.</div>
        ) : (
          results.map((c) => (
            <div
              key={c.id}
              className="bg-[var(--accent)] border border-[var(--border)] rounded-2xl p-5 shadow-white/10"
            >
              <h3 className="font-bold text-xl mb-2">{c.title} {c.firstName} {c.lastName}</h3>
              <p><strong>Profession:</strong> {c.profession}</p>
              <p><strong>Specialty:</strong> {c.specialty}</p>
              <p><strong>Experience:</strong> {c.experience} years</p>
              <p><strong>Current Employer:</strong> {c.employer}</p>
              <p><strong>Preferred Counties:</strong> {(c.preferredCounties || []).join(", ") || 'Flexible'}</p>
              <p><strong>Availability:</strong> {c.availability || 'Contact for details'}</p>
              <p className="mt-3">
                <strong>Status:</strong>{" "}
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  c.verificationStatus === "verified"
                    ? "bg-green-100 text-green-800"
                    : c.verificationStatus === "flagged"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {c.verificationStatus}
                </span>
              </p>
              {c.additionalInfo && <p><strong>Additional Info:</strong> {c.additionalInfo}</p>}

              <div className="mt-4">
                <button
                  onClick={() => contactVolunteer(c)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-white/10 transition"
                >
                  Contact Volunteer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
