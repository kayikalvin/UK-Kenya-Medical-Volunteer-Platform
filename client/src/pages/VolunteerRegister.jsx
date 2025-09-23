// import { useState } from "react";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import Alert from "../components/Alert";

// export default function VolunteerRegister() {
//   const { getToken } = useAuth();
//   const { user } = useUser();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     profession: "",
//     specialty: "",
//     registrationNumber: "",
//     yearsExperience: "",
//     currentEmployer: "",
//     availabilityStart: "",
//     availabilityEnd: "",
//     preferredDuration: "",
//     languages: "",
//     motivation: "",
//     previousVolunteer: "",
//   });

//   const [alert, setAlert] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.firstName || !form.lastName || !form.email || !form.profession) {
//       setAlert({ type: "error", message: "Please fill all required fields." });
//       return;
//     }

//     try {
//       setLoading(true);

//       const token = await getToken();
//       if (!token) {
//         setAlert({ type: "error", message: "Authentication required." });
//         return;
//       }

//       const payload = {
//         ...form,
//         clerkId: user?.id,
//         registrationDate: new Date().toISOString(),
//         verificationStatus: "pending",
//         registrationStatus: "completed",
//       };

//       const res = await fetch("http://localhost:5000/api/volunteers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Clerk session token
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to register volunteer");
//       }

//       setAlert({ type: "success", message: "Volunteer registered successfully!" });

//       // reset form
//       setForm({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         profession: "",
//         specialty: "",
//         registrationNumber: "",
//         yearsExperience: "",
//         currentEmployer: "",
//         availabilityStart: "",
//         availabilityEnd: "",
//         preferredDuration: "",
//         languages: "",
//         motivation: "",
//         previousVolunteer: "",
//       });
//     } catch (err) {
//       console.error("Error registering volunteer:", err);
//       setAlert({ type: "error", message: err.message || "Error registering volunteer." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[var(--background)] text-[var(--muted-foreground)] p-8 rounded-2xl shadow-white/20 max-w-4xl mx-auto my-10">
//       <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">Volunteer Registration</h2>

//       {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="First Name *"
//             required
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           />
//           <input
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Last Name *"
//             required
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           />
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="Email *"
//             required
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           />
//           <input
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Phone *"
//             required
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           />
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <select
//             name="profession"
//             value={form.profession}
//             onChange={handleChange}
//             required
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           >
//             <option value="">Select Profession *</option>
//             <option>Doctor</option>
//             <option>Nurse</option>
//             <option>Surgeon</option>
//             <option>Anaesthetist</option>
//             <option>Midwife</option>
//             <option>Physiotherapist</option>
//             <option>Pharmacist</option>
//             <option>Radiologist</option>
//             <option>Other</option>
//           </select>
//           <input
//             name="specialty"
//             value={form.specialty}
//             onChange={handleChange}
//             placeholder="Specialty"
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           />
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             name="registrationNumber"
//             value={form.registrationNumber}
//             onChange={handleChange}
//             placeholder="UK Registration Number *"
//             required
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           />
//           <select
//             name="yearsExperience"
//             value={form.yearsExperience}
//             onChange={handleChange}
//             required
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           >
//             <option value="">Years of Experience *</option>
//             <option>1-2</option>
//             <option>3-5</option>
//             <option>6-10</option>
//             <option>11-15</option>
//             <option>16+</option>
//           </select>
//         </div>

//         <input
//           name="currentEmployer"
//           value={form.currentEmployer}
//           onChange={handleChange}
//           placeholder="Current Employer *"
//           required
//           className="w-full bg-[var(--accent)] p-3 rounded-lg border"
//         />

//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             name="availabilityStart"
//             value={form.availabilityStart}
//             onChange={handleChange}
//             type="date"
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           />
//           <input
//             name="availabilityEnd"
//             value={form.availabilityEnd}
//             onChange={handleChange}
//             type="date"
//             className="bg-[var(--accent)] p-3 rounded-lg border"
//           />
//         </div>

//         <select
//           name="preferredDuration"
//           value={form.preferredDuration}
//           onChange={handleChange}
//           className="w-full bg-[var(--accent)] p-3 rounded-lg border"
//         >
//           <option value="">Preferred Duration</option>
//           <option>2-4 weeks</option>
//           <option>1-2 months</option>
//           <option>3-6 months</option>
//           <option>6+ months</option>
//         </select>

//         <input
//           name="languages"
//           value={form.languages}
//           onChange={handleChange}
//           placeholder="Languages (English, Swahili...)"
//           className="w-full bg-[var(--accent)] p-3 rounded-lg border"
//         />

//         <textarea
//           name="motivation"
//           value={form.motivation}
//           onChange={handleChange}
//           placeholder="Why do you want to volunteer?"
//           className="w-full bg-[var(--accent)] p-3 rounded-lg border"
//         />

//         <textarea
//           name="previousVolunteer"
//           value={form.previousVolunteer}
//           onChange={handleChange}
//           placeholder="Previous international experience"
//           className="w-full bg-[var(--accent)] p-3 rounded-lg border"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[var(--primary)] text-white py-3 rounded-full font-semibold text-lg"
//         >
//           {loading ? "Submitting..." : "Submit Registration"}
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import Alert from "../components/Alert";

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
    documents: [], // <-- file upload
  });

  const [alert, setAlert] = useState(null);
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
      setAlert({ type: "error", message: "Please fill all required fields." });
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        setAlert({ type: "error", message: "Authentication required." });
        return;
      }

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
        headers: {
          Authorization: `Bearer ${token}`, // Don't set Content-Type for FormData
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to register volunteer");

      setAlert({ type: "success", message: "Volunteer registered successfully!" });

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
      setAlert({ type: "error", message: err.message || "Error registering volunteer." });
    } finally {
      setLoading(false);
    }
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
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name *"
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email *"
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone *"
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="profession"
            value={form.profession}
            onChange={handleChange}
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
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
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="registrationNumber"
            value={form.registrationNumber}
            onChange={handleChange}
            placeholder="UK Registration Number *"
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
          <select
            name="yearsExperience"
            value={form.yearsExperience}
            onChange={handleChange}
            required
            className="bg-[var(--accent)] p-3 rounded-lg border"
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
          required
          className="w-full bg-[var(--accent)] p-3 rounded-lg border"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="availabilityStart"
            value={form.availabilityStart}
            onChange={handleChange}
            type="date"
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
          <input
            name="availabilityEnd"
            value={form.availabilityEnd}
            onChange={handleChange}
            type="date"
            className="bg-[var(--accent)] p-3 rounded-lg border"
          />
        </div>

        <select
          name="preferredDuration"
          value={form.preferredDuration}
          onChange={handleChange}
          className="w-full bg-[var(--accent)] p-3 rounded-lg border"
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
          className="w-full bg-[var(--accent)] p-3 rounded-lg border"
        />

        <textarea
          name="motivation"
          value={form.motivation}
          onChange={handleChange}
          placeholder="Why do you want to volunteer?"
          className="w-full bg-[var(--accent)] p-3 rounded-lg border"
        />

        <textarea
          name="previousVolunteer"
          value={form.previousVolunteer}
          onChange={handleChange}
          placeholder="Previous international experience"
          className="w-full bg-[var(--accent)] p-3 rounded-lg border"
        />

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
