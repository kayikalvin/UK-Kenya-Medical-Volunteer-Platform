// import { useState } from "react";
// import Alert from "../components/Alert";

// export default function ClinicianRegister({ clinicians, setClinicians }) {
//   const [form, setForm] = useState({
//     title: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     profession: "",
//     specialty: "",
//     experience: "",
//     gmcNumber: "",
//     employer: "",
//     availability: "",
//     preferredCounties: [],
//     additionalInfo: "",
//   });
//   const [alert, setAlert] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, type, selectedOptions } = e.target;
//     if (type === "select-multiple") {
//       setForm({
//         ...form,
//         [name]: Array.from(selectedOptions).map((o) => o.value),
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setClinicians([
//       ...clinicians,
//       {
//         ...form,
//         id: Date.now(),
//         registrationDate: new Date().toISOString(),
//         verificationStatus: "pending",
//       },
//     ]);
//     setForm({
//       title: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       profession: "",
//       specialty: "",
//       experience: "",
//       gmcNumber: "",
//       employer: "",
//       availability: "",
//       preferredCounties: [],
//       additionalInfo: "",
//     });
//     setAlert({ type: "success", message: "Clinician registered successfully!" });
//   };

//   return (
//     <div className="bg-[var(--background)] text-[var(--muted-foreground)] p-8 rounded-2xl shadow-white/20 max-w-3xl mx-auto my-10">
//       <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">
//         Clinician Registration
//       </h2>

//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           onClose={() => setAlert(null)}
//         />
//       )}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="grid md:grid-cols-2 gap-4">
//           <select
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             required
//             className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
//           >
//             <option value="">Select Title</option>
//             <option>Dr</option>
//             <option>Mr</option>
//             <option>Mrs</option>
//             <option>Ms</option>
//             <option>Professor</option>
//           </select>

//           <input
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//             required
//             className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
//           />

//           <input
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             required
//             className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
//           />

//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//             className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
//           />

//           <input
//             name="phone"
//             type="tel"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Phone"
//             required
//             className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
//           />

//           <select
//             name="profession"
//             value={form.profession}
//             onChange={handleChange}
//             required
//             className="bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
//           >
//             <option value="">Select Profession</option>
//             <option>Doctor</option>
//             <option>Nurse</option>
//             <option>Surgeon</option>
//             <option>Anaesthetist</option>
//             <option>Radiologist</option>
//             <option>Pathologist</option>
//             <option>Psychiatrist</option>
//             <option>Paediatrician</option>
//             <option>Obstetrician/Gynaecologist</option>
//             <option>Physiotherapist</option>
//             <option>Other</option>
//           </select>
//         </div>

//         <textarea
//           name="availability"
//           value={form.availability}
//           onChange={handleChange}
//           placeholder="Describe availability"
//           className="w-full bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
//         />

//         <select
//           name="preferredCounties"
//           value={form.preferredCounties}
//           onChange={handleChange}
//           multiple
//           className="w-full bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
//         >
//           <option value="Nairobi">Nairobi</option>
//           <option value="Mombasa">Mombasa</option>
//           <option value="Kisumu">Kisumu</option>
//           <option value="Nakuru">Nakuru</option>
//         </select>

//         <textarea
//           name="additionalInfo"
//           value={form.additionalInfo}
//           onChange={handleChange}
//           placeholder="Additional info"
//           className="w-full bg-[var(--accent)] text-[var(--muted-foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
//         />

//         <button
//           type="submit"
//           className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-white/20"
//         >
//           Register as Clinician
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import Alert from "../components/Alert";

export default function ClinicianRegister() {
  const { user } = useUser();
  const { getToken } = useAuth(); // 🔑 Clerk token helper

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "select-multiple") {
      const selectedValues = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setForm({
        ...form,
        [name]: selectedValues,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setAlert({ type: "error", message: "You must be signed in to register." });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        clerkId: user.id,
        email: form.email || user.primaryEmailAddress?.emailAddress,
      };

      // 🔑 get Clerk session token
      const token = await getToken();

      const res = await fetch("http://localhost:5000/api/clinicians", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 REQUIRED for backend auth
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to register clinician");
      }

      setAlert({ type: "success", message: "Clinician registered successfully!" });

      // reset form
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
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
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
            className="bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
          >
            <option value="">Select Title</option>
            <option value="Dr">Dr</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Professor">Professor</option>
          </select>

          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
          />

          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
          />

          <select
            name="profession"
            value={form.profession}
            onChange={handleChange}
            required
            className="bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
          >
            <option value="">Select Profession</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Surgeon">Surgeon</option>
            <option value="Anaesthetist">Anaesthetist</option>
            <option value="Radiologist">Radiologist</option>
            <option value="Pathologist">Pathologist</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Paediatrician">Paediatrician</option>
            <option value="Obstetrician/Gynaecologist">Obstetrician/Gynaecologist</option>
            <option value="Physiotherapist">Physiotherapist</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <textarea
          name="availability"
          value={form.availability}
          onChange={handleChange}
          placeholder="Describe availability"
          className="w-full bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
        />

        <div>
          <label className="block font-semibold mb-2 text-[var(--foreground)]">
            Preferred Counties (Hold Ctrl/Cmd to select multiple)
          </label>
          <select
            name="preferredCounties"
            value={form.preferredCounties}
            onChange={handleChange}
            multiple
            className="w-full bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg h-48"
          >
            {[
              "Mombasa","Kwale","Kilifi","Tana River","Lamu","Taita-Taveta","Garissa",
              "Wajir","Mandera","Marsabit","Isiolo","Meru","Tharaka-Nithi","Embu",
              "Kitui","Machakos","Makueni","Nyandarua","Nyeri","Kirinyaga","Murang'a",
              "Kiambu","Turkana","West Pokot","Samburu","Trans-Nzoia","Uasin Gishu",
              "Elgeyo-Marakwet","Nandi","Baringo","Laikipia","Nakuru","Narok","Kajiado",
              "Kericho","Bomet","Kakamega","Vihiga","Bungoma","Busia","Siaya","Kisumu",
              "Homa Bay","Migori","Kisii","Nyamira","Nairobi"
            ].map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
          {form.preferredCounties.length > 0 && (
            <div className="mt-2 text-sm text-[var(--muted-foreground)]">
              Selected: {form.preferredCounties.join(", ")}
            </div>
          )}
        </div>

        <textarea
          name="additionalInfo"
          value={form.additionalInfo}
          onChange={handleChange}
          placeholder="Additional info"
          className="w-full bg-[var(--accent)] border border-[var(--border)] p-3 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] py-3 rounded-full font-semibold text-lg transition-all disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Register as Clinician"}
        </button>
      </form>
    </div>
  );
}
