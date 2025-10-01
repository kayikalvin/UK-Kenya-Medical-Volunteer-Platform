import { useNavigate } from "react-router-dom";

export default function EmailVerified() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-xl font-semibold mb-4">Email Verified!</h1>
        <p className="text-gray-700 mb-4">
          Your email has been successfully verified.
        </p>
        <button
          onClick={() => navigate("/sign-in")}
          className="bg-gray-900 text-white px-4 py-2 rounded-md"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
}
