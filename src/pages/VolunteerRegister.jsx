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
    <div className="bg-white p-4 rounded-lg shadow-md max-w-4xl mx-auto my-4">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Volunteer Registration</h2>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name *" className="border p-2 rounded" />
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name *" className="border p-2 rounded" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email *" className="border p-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone *" className="border p-2 rounded" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select name="profession" value={form.profession} onChange={handleChange} className="border p-2 rounded">
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
          <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="Specialty" className="border p-2 rounded" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="UK Registration Number *" className="border p-2 rounded" />
          <select name="yearsExperience" value={form.yearsExperience} onChange={handleChange} className="border p-2 rounded">
            <option value="">Years of Experience *</option>
            <option>1-2</option>
            <option>3-5</option>
            <option>6-10</option>
            <option>11-15</option>
            <option>16+</option>
          </select>
        </div>

        <input name="currentEmployer" value={form.currentEmployer} onChange={handleChange} placeholder="Current Employer *" className="border p-2 rounded w-full" />

        <div className="grid md:grid-cols-2 gap-4">
          <input name="availabilityStart" value={form.availabilityStart} onChange={handleChange} type="date" className="border p-2 rounded" />
          <input name="availabilityEnd" value={form.availabilityEnd} onChange={handleChange} type="date" className="border p-2 rounded" />
        </div>

        <select name="preferredDuration" value={form.preferredDuration} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">Preferred Duration</option>
          <option>2-4 weeks</option>
          <option>1-2 months</option>
          <option>3-6 months</option>
          <option>6+ months</option>
        </select>

        <input name="languages" value={form.languages} onChange={handleChange} placeholder="Languages (English, Swahili...)" className="border p-2 rounded w-full" />

        <textarea name="motivation" value={form.motivation} onChange={handleChange} placeholder="Why do you want to volunteer?" className="border p-2 rounded w-full" />

        <textarea name="previousVolunteer" value={form.previousVolunteer} onChange={handleChange} placeholder="Previous international experience" className="border p-2 rounded w-full" />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded">Submit Registration</button>
      </form>
    </div>
  );
}
