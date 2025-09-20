import { useState } from "react";
import Alert from "../components/Alert";

export default function ClinicianRegister({ clinicians, setClinicians }) {
  const [form, setForm] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profession: "",
    specialty: "",
    experience: "",
    gmcNumber: "",
    employer: "",
    availability: "",
    preferredCounties: [],
    additionalInfo: "",
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      setForm({
        ...form,
        [name]: Array.from(selectedOptions).map((o) => o.value),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClinicians([
      ...clinicians,
      {
        ...form,
        id: Date.now(),
        registrationDate: new Date().toISOString(),
        verificationStatus: "pending",
      },
    ]);
    setForm({
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profession: "",
      specialty: "",
      experience: "",
      gmcNumber: "",
      employer: "",
      availability: "",
      preferredCounties: [],
      additionalInfo: "",
    });
    setAlert({ type: "success", message: "Clinician registered successfully!" });
  };

  return (
    <div className="bg-[var(--background)] text-[var(--muted-foreground)] p-8 rounded-2xl shadow-white/20 max-w-3xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">
        Clinician Registration
      </h2>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          >
            <option value="">Select Title</option>
            <option>Dr</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
            <option>Professor</option>
          </select>

          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />

          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />

          <select
            name="profession"
            value={form.profession}
            onChange={handleChange}
            required
            className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          >
            <option value="">Select Profession</option>
            <option>Doctor</option>
            <option>Nurse</option>
            <option>Surgeon</option>
            <option>Anaesthetist</option>
            <option>Radiologist</option>
            <option>Pathologist</option>
            <option>Psychiatrist</option>
            <option>Paediatrician</option>
            <option>Obstetrician/Gynaecologist</option>
            <option>Physiotherapist</option>
            <option>Other</option>
          </select>
        </div>

        <textarea
          name="availability"
          value={form.availability}
          onChange={handleChange}
          placeholder="Describe availability"
          className="w-full bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />

        <select
          name="preferredCounties"
          value={form.preferredCounties}
          onChange={handleChange}
          multiple
          className="w-full bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        >
          <option value="Nairobi">Nairobi</option>
          <option value="Mombasa">Mombasa</option>
          <option value="Kisumu">Kisumu</option>
          <option value="Nakuru">Nakuru</option>
        </select>

        <textarea
          name="additionalInfo"
          value={form.additionalInfo}
          onChange={handleChange}
          placeholder="Additional info"
          className="w-full bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />

        <button
          type="submit"
          className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-white/20"
        >
          Register as Clinician
        </button>
      </form>
    </div>
  );
}
