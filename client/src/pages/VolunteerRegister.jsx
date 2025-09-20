import { useState } from "react";
import Alert from "../components/Alert";

export default function VolunteerRegister({ volunteers, setVolunteers, setCurrentUser }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profession: "",
    specialty: "",
    registrationNumber: "",
    yearsExperience: "",
    currentEmployer: "",
    availabilityStart: "",
    availabilityEnd: "",
    preferredDuration: "",
    languages: "",
    motivation: "",
    previousVolunteer: "",
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.profession) {
      setAlert({ type: "error", message: "Please fill all required fields." });
      return;
    }

    const newVolunteer = {
      ...form,
      id: Date.now(),
      registrationDate: new Date().toISOString(),
      verificationStatus: "pending",
      registrationStatus: "completed",
    };

    setVolunteers([...volunteers, newVolunteer]);
    setCurrentUser(newVolunteer);
    setAlert({ type: "success", message: "Registration submitted successfully!" });

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profession: "",
      specialty: "",
      registrationNumber: "",
      yearsExperience: "",
      currentEmployer: "",
      availabilityStart: "",
      availabilityEnd: "",
      preferredDuration: "",
      languages: "",
      motivation: "",
      previousVolunteer: "",
    });
  };

  return (
    <div className="bg-[var(--background)] text-[var(--muted-foreground)] p-8 rounded-2xl shadow-white/20 max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">Volunteer Registration</h2>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name *"
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name *"
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email *"
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone *"
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="profession"
            value={form.profession}
            onChange={handleChange}
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          >
            <option value="">Select Profession *</option>
            <option>Doctor</option>
            <option>Nurse</option>
            <option>Surgeon</option>
            <option>Anaesthetist</option>
            <option>Midwife</option>
            <option>Physiotherapist</option>
            <option>Pharmacist</option>
            <option>Radiologist</option>
            <option>Other</option>
          </select>
          <input
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            placeholder="Specialty"
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="registrationNumber"
            value={form.registrationNumber}
            onChange={handleChange}
            placeholder="UK Registration Number *"
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
          <select
            name="yearsExperience"
            value={form.yearsExperience}
            onChange={handleChange}
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          >
            <option value="">Years of Experience *</option>
            <option>1-2</option>
            <option>3-5</option>
            <option>6-10</option>
            <option>11-15</option>
            <option>16+</option>
          </select>
        </div>

        <input
          name="currentEmployer"
          value={form.currentEmployer}
          onChange={handleChange}
          placeholder="Current Employer *"
          className="w-full bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="availabilityStart"
            value={form.availabilityStart}
            onChange={handleChange}
            type="date"
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
          <input
            name="availabilityEnd"
            value={form.availabilityEnd}
            onChange={handleChange}
            type="date"
            className="bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          />
        </div>

        <select
          name="preferredDuration"
          value={form.preferredDuration}
          onChange={handleChange}
          className="w-full bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        >
          <option value="">Preferred Duration</option>
          <option>2-4 weeks</option>
          <option>1-2 months</option>
          <option>3-6 months</option>
          <option>6+ months</option>
        </select>

        <input
          name="languages"
          value={form.languages}
          onChange={handleChange}
          placeholder="Languages (English, Swahili...)"
          className="w-full bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />

        <textarea
          name="motivation"
          value={form.motivation}
          onChange={handleChange}
          placeholder="Why do you want to volunteer?"
          className="w-full bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />

        <textarea
          name="previousVolunteer"
          value={form.previousVolunteer}
          onChange={handleChange}
          placeholder="Previous international experience"
          className="w-full bg-[var(--accent)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        />

        <button
          type="submit"
          className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] py-3 rounded-full font-semibold text-lg transition shadow-white/20"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
}
