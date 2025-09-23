import { useAuth } from "@clerk/clerk-react";

const API_BASE = "http://localhost:5000/api"; // 👈 make sure backend has /api prefix

export const useApi = () => {
  const { getToken } = useAuth();

  const fetchWithToken = async (url, options = {}) => {
    const token = await getToken();
    const res = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      let errorMsg = "API request failed";
      try {
        const error = await res.json();
        errorMsg = error.error || errorMsg;
      } catch {
        // ignore if not JSON
      }
      throw new Error(errorMsg);
    }

    return res.json();
  };

  return {
    // Volunteers
    fetchVolunteers: () => fetchWithToken("/volunteers"),
    createVolunteer: (data) =>
      fetchWithToken("/volunteers", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    verifyVolunteer: (volunteerId, status) =>
      fetchWithToken(`/volunteers/${volunteerId}/verify`, {
        method: "PATCH",
        body: JSON.stringify({ status }), // ✅ now matches controller
      }),

    // Hospitals
    fetchHospitals: () => fetchWithToken("/hospitals"),
    createHospital: (data) =>
      fetchWithToken("/hospitals", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    // Clinicians
    fetchClinicians: () => fetchWithToken("/clinicians"),
    createClinician: (data) =>
      fetchWithToken("/clinicians", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    // Admin
    promoteToAdmin: (userId) =>
      fetchWithToken("/promote", {
        method: "POST",
        body: JSON.stringify({ userId }),
      }),
  };
};

export default useApi;
