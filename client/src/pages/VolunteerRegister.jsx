import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";


export default function VolunteerRegister() {
  const { getToken } = useAuth();
  const { user } = useUser();

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
    documents: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, documents: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.profession) {
      return toast.error("Please fill all required fields.");
    }

    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return toast.error("sign in or create an account to continue.");

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "documents") {
          form.documents.forEach((file) => formData.append("documents", file));
        } else {
          formData.append(key, form[key]);
        }
      });
      formData.append("clerkId", user?.id);
      formData.append("registrationDate", new Date().toISOString());
      formData.append("verificationStatus", "pending");
      formData.append("registrationStatus", "completed");

      const res = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to register volunteer");

      toast.success("Volunteer registered successfully!");

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
        documents: [],
      });
    } catch (err) {
      console.error("Error registering volunteer:", err);
      toast.error(err.message || "Error registering volunteer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--background)] text-[var(--muted-foreground)] p-8 rounded-2xl shadow-white/20 max-w-4xl mx-auto my-10">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">Volunteer Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-semibold mb-1 block">First Name *</span>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
            />
          </label>
          <label className="block">
            <span className="font-semibold mb-1 block">Last Name *</span>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
            />
          </label>
        </div>

        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-semibold mb-1 block">Email *</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
            />
          </label>
          <label className="block">
            <span className="font-semibold mb-1 block">Phone *</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
            />
          </label>
        </div>

        {/* Profession */}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-semibold mb-1 block">Profession *</span>
            <select
              name="profession"
              value={form.profession}
              onChange={handleChange}
              required
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
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
          </label>
          <label className="block">
            <span className="font-semibold mb-1 block">Specialty</span>
            <input
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
            />
          </label>
        </div>

        {/* Registration Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-semibold mb-1 block">UK Registration Number *</span>
            <input
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
              required
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
            />
          </label>
          <label className="block">
            <span className="font-semibold mb-1 block">Years of Experience *</span>
            <select
              name="yearsExperience"
              value={form.yearsExperience}
              onChange={handleChange}
              required
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
            >
              <option value="">Select Years *</option>
              <option>1-2</option>
              <option>3-5</option>
              <option>6-10</option>
              <option>11-15</option>
              <option>16+</option>
            </select>
          </label>
        </div>

        {/* Employer */}
        <label className="block">
          <span className="font-semibold mb-1 block">Current Employer *</span>
          <input
            name="currentEmployer"
            value={form.currentEmployer}
            onChange={handleChange}
            required
            className="w-full bg-[var(--accent)] p-3 rounded-lg border"
          />
        </label>

        {/* Availability */}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-semibold mb-1 block">Availability Start</span>
            <input
              name="availabilityStart"
              value={form.availabilityStart}
              onChange={handleChange}
              type="date"
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
            />
          </label>
          <label className="block">
            <span className="font-semibold mb-1 block">Availability End</span>
            <input
              name="availabilityEnd"
              value={form.availabilityEnd}
              onChange={handleChange}
              type="date"
              className="bg-[var(--accent)] p-3 rounded-lg border w-full"
            />
          </label>
        </div>

        <label className="block">
          <span className="font-semibold mb-1 block">Preferred Duration</span>
          <select
            name="preferredDuration"
            value={form.preferredDuration}
            onChange={handleChange}
            className="w-full bg-[var(--accent)] p-3 rounded-lg border"
          >
            <option value="">Select Duration</option>
            <option>2-4 weeks</option>
            <option>1-2 months</option>
            <option>3-6 months</option>
            <option>6+ months</option>
          </select>
        </label>

        <label className="block">
          <span className="font-semibold mb-1 block">Languages</span>
          <input
            name="languages"
            value={form.languages}
            onChange={handleChange}
            placeholder="English, Swahili..."
            className="w-full bg-[var(--accent)] p-3 rounded-lg border"
          />
        </label>

        <label className="block">
          <span className="font-semibold mb-1 block">Motivation</span>
          <textarea
            name="motivation"
            value={form.motivation}
            onChange={handleChange}
            placeholder="Why do you want to volunteer?"
            className="w-full bg-[var(--accent)] p-3 rounded-lg border"
          />
        </label>

        <label className="block">
          <span className="font-semibold mb-1 block">Previous Volunteer Experience</span>
          <textarea
            name="previousVolunteer"
            value={form.previousVolunteer}
            onChange={handleChange}
            placeholder="Previous international experience"
            className="w-full bg-[var(--accent)] p-3 rounded-lg border"
          />
        </label>

        {/* File Upload */}
        <div className="file-upload border-dashed border-2 border-gray-400 p-4 rounded-lg cursor-pointer">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
            id="documents"
          />
          <label htmlFor="documents" className="w-full block text-center text-gray-600">
            {form.documents.length > 0
              ? `${form.documents.length} file(s) selected`
              : "Click to upload documents (CV, certificates, registration proof)"}
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white py-3 rounded-full font-semibold text-lg"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}
