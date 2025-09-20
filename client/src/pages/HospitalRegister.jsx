import { useState } from "react";
import Alert from "../components/Alert";

export default function HospitalRegister({ hospitals, setHospitals }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    county: "",
    beds: "",
    contactPerson: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    latitude: "",
    longitude: "",
    clinicalNeeds: "",
    departments: [],
    accommodation: "",
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "department") return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeptChange = (dept) => {
    setForm((prev) => {
      const exists = prev.departments.includes(dept);
      return {
        ...prev,
        departments: exists
          ? prev.departments.filter((d) => d !== dept)
          : [...prev.departments, dept],
      };
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setAlert({ type: "error", message: "Geolocation not supported." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
        setAlert({ type: "success", message: "GPS location captured!" });
      },
      () => {
        setAlert({ type: "error", message: "Unable to get GPS location." });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.county || !form.contactPerson || !form.contactEmail) {
      setAlert({ type: "error", message: "Please fill required fields." });
      return;
    }
    const newHospital = {
      ...form,
      id: Date.now(),
      registrationDate: new Date().toISOString(),
      verified: true,
    };
    setHospitals([...hospitals, newHospital]);
    setAlert({ type: "success", message: "Hospital registration successful!" });
    setForm({
      name: "",
      type: "",
      county: "",
      beds: "",
      contactPerson: "",
      contactTitle: "",
      contactEmail: "",
      contactPhone: "",
      latitude: "",
      longitude: "",
      clinicalNeeds: "",
      departments: [],
      accommodation: "",
    });
  };

  const departmentsList = [
    "Emergency",
    "Surgery",
    "Medicine",
    "Paediatrics",
    "Obstetrics",
    "Orthopaedics",
    "Radiology",
    "Laboratory",
    "Pharmacy",
    "Physiotherapy",
  ];

  return (
    <div className="bg-[var(--background)] text-[var(--muted-foreground)] p-8 rounded-2xl shadow-white/20 max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">Hospital Registration</h2>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Hospital Name *"
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          >
            <option value="">Hospital Type *</option>
            <option value="Public">Public Hospital</option>
            <option value="Private">Private Hospital</option>
            <option value="Mission">Mission Hospital</option>
            <option value="NGO">NGO-operated</option>
            <option value="County">County Hospital</option>
          </select>

          <select
            name="county"
            value={form.county}
            onChange={handleChange}
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          >
            <option value="">Select County *</option>
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
            <option>Nakuru</option>
            <option>Uasin Gishu</option>
            <option>Machakos</option>
            <option>Meru</option>
            <option>Kiambu</option>
            <option>Trans Nzoia</option>
            <option>Kilifi</option>
            <option>Kakamega</option>
            <option>Kericho</option>
            <option>Nyeri</option>
            <option>Kisii</option>
            <option>Bungoma</option>
          </select>

          <input
            name="beds"
            value={form.beds}
            onChange={handleChange}
            type="number"
            min="1"
            placeholder="Number of Beds"
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            placeholder="Contact Person Name *"
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
          <input
            name="contactTitle"
            value={form.contactTitle}
            onChange={handleChange}
            placeholder="Contact Title (e.g., Medical Director) *"
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
          <input
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            type="email"
            placeholder="Contact Email *"
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
          <input
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
            placeholder="Contact Phone *"
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 items-end">
          <input
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            placeholder="GPS Latitude"
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
          <input
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            placeholder="GPS Longitude"
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg transition"
          >
            📍 Get Current GPS Location
          </button>
          <span className="text-[var(--muted-foreground)] text-sm">or enter coordinates manually</span>
        </div>

        <textarea
          name="clinicalNeeds"
          value={form.clinicalNeeds}
          onChange={handleChange}
          placeholder="Describe clinical needs *"
          required
          className="w-full bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />

        <div>
          <label className="block font-semibold mb-2 text-[var(--muted-foreground)]">Available Departments</label>
          <div className="grid md:grid-cols-3 gap-2">
            {departmentsList.map((d) => (
              <label key={d} className="flex items-center gap-2 text-[var(--muted-foreground)]">
                <input
                  type="checkbox"
                  checked={form.departments.includes(d)}
                  onChange={() => handleDeptChange(d)}
                  className="w-4 h-4 accent-[var(--primary)]"
                />
                <span>{d}</span>
              </label>
            ))}
          </div>
        </div>

        <select
          name="accommodation"
          value={form.accommodation}
          onChange={handleChange}
          className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        >
          <option value="">Accommodation Available</option>
          <option value="Yes">Yes - On-site accommodation</option>
          <option value="Nearby">Nearby accommodation available</option>
          <option value="No">No - Volunteers arrange own</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-white/20"
        >
          Register Hospital
        </button>
      </form>
    </div>
  );
}
