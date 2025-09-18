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
    <div className="bg-white p-6 rounded-lg shadow-md  max-w-3xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Clinician Registration
      </h2>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 ">
          <select
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="border p-2 rounded"
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
            className="border p-2 rounded"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border p-2 rounded"
          />
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="border p-2 rounded"
          />
          <select
            name="profession"
            value={form.profession}
            onChange={handleChange}
            required
            className="border p-2 rounded"
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
          className="border p-2 rounded w-full"
        />

        <select
          name="preferredCounties"
          value={form.preferredCounties}
          onChange={handleChange}
          multiple
          className="border p-2 rounded w-full"
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
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Register as Clinician
        </button>
      </form>
    </div>
  );
}
