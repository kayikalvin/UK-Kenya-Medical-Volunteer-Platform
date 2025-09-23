import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import Alert from "../components/Alert";

export default function HospitalRegister({ hospitals, setHospitals }) {
  const { getToken } = useAuth();
  const { user } = useUser();

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
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.county || !form.contactPerson || !form.contactEmail) {
      setAlert({ type: "error", message: "Please fill required fields." });
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();
      if (!token) {
        setAlert({ type: "error", message: "Authentication required." });
        return;
      }

      const payload = {
        ...form,
        clerkId: user?.id,
        registrationDate: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:5000/api/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Clerk session token
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to register hospital");
      }

      setHospitals([...hospitals, data]); // backend returns hospital
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
    } catch (err) {
      console.error("Error registering hospital:", err);
      setAlert({ type: "error", message: err.message || "Error registering hospital." });
    } finally {
      setLoading(false);
    }
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
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          >
            <option value="">Hospital Type *</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Mission">Mission</option>
            <option value="NGO">NGO-operated</option>
            <option value="County">County</option>
          </select>

          <select
            name="county"
            value={form.county}
            onChange={handleChange}
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
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
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            placeholder="Contact Person *"
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
          <input
            name="contactTitle"
            value={form.contactTitle}
            onChange={handleChange}
            placeholder="Contact Title *"
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
          <input
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            type="email"
            placeholder="Contact Email *"
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
          <input
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
            placeholder="Contact Phone *"
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 items-end">
          <input
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            placeholder="GPS Latitude"
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
          <input
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            placeholder="GPS Longitude"
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
        </div>

        <button
          type="button"
          onClick={getCurrentLocation}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg"
        >
          📍 Get GPS Location
        </button>

        <textarea
          name="clinicalNeeds"
          value={form.clinicalNeeds}
          onChange={handleChange}
          placeholder="Describe clinical needs *"
          required
          className="w-full bg-[var(--accent)] p-3 rounded-lg border"
        />

        <div>
          <label className="block font-semibold mb-2">Available Departments</label>
          <div className="grid md:grid-cols-3 gap-2">
            {departmentsList.map((d) => (
              <label key={d} className="flex items-center gap-2">
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
          className="bg-[var(--accent)] p-3 rounded-lg border"
        >
          <option value="">Accommodation Available</option>
          <option value="Yes">Yes - On-site</option>
          <option value="Nearby">Nearby</option>
          <option value="No">No</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white py-3 rounded-full font-semibold text-lg"
        >
          {loading ? "Registering..." : "Register Hospital"}
        </button>
      </form>
    </div>
  );
}
