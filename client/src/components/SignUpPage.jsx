// import { useSignUp } from "@clerk/clerk-react";
// import { useState } from "react";
// import { Eye, EyeOff, AlertCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function CustomSignUp() {
//   const { signUp, isLoaded } = useSignUp();
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     role: "professional", // default
//   });

//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
//     if (error) setError("");
//   };

//   const handleGoogleSignup = async () => {
//     if (!isLoaded) return;

//     try {
//       setLoading(true);
//       await signUp.authenticateWithRedirect({
//         strategy: "oauth_google",
//         redirectUrl: "/sso-callback",
//         redirectUrlComplete: "/dashboard",
//       });
//     } catch (err) {
//       console.error(err);
//       setError(err.errors?.[0]?.longMessage || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isLoaded || loading) return;

//     setLoading(true);
//     setError("");

//     try {
//       // Create the user
//       await signUp.create({
//         emailAddress: form.email,
//         password: form.password,
//         firstName: form.firstName,
//         lastName: form.lastName,
//         publicMetadata: { role: form.role },
//       });

//       // ✅ Instead of redirectToSignIn (doesn't exist),
//       // send the user to Clerk's built-in sign-in page for email verification
//       navigate("/sign-in");
//     } catch (err) {
//       console.error(err);
//       setError(err.errors?.[0]?.longMessage || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//             Create your account
//           </h1>
//           <p className="text-gray-600">
//             Welcome! Please fill in the details to get started.
//           </p>
//         </div>

//         {/* Google Sign Up */}
//         <button
//           onClick={handleGoogleSignup}
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-3 px-4 mb-4 hover:bg-gray-50 transition-colors relative disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <svg className="w-5 h-5" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//             />
//           </svg>
//           Continue with Google
//         </button>

//         <div className="flex items-center my-6">
//           <div className="flex-1 border-t border-gray-300"></div>
//           <span className="px-4 text-gray-500 text-sm">or</span>
//           <div className="flex-1 border-t border-gray-300"></div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
//             <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//             <div className="text-red-700 text-sm">{error}</div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label
//                 htmlFor="firstName"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 First name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={form.firstName}
//                 onChange={handleChange}
//                 placeholder="First name"
//                 required
//                 disabled={loading}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="lastName"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Last name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={form.lastName}
//                 onChange={handleChange}
//                 placeholder="Last name"
//                 required
//                 disabled={loading}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//               />
//             </div>
//           </div>

//           {/* Email Field */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Enter your email address"
//               required
//               disabled={loading}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 required
//                 disabled={loading}
//                 className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 disabled={loading}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           {/* Role Selection */}
//           <div>
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Account type
//             </label>
//             <select
//               id="role"
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               disabled={loading}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//             >
//               <option value="professional">Professional</option>
//               <option value="organization">Organization</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading || !isLoaded}
//             className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Creating account...
//               </>
//             ) : (
//               <>
//                 Continue
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </>
//             )}
//           </button>
//         </form>

//         {/* Sign In Link */}
//         <div className="text-center mt-6">
//           <p className="text-gray-600">
//             Already have an account?{" "}
//             <button
//               onClick={() => navigate("/sign-in")}
//               className="text-gray-900 font-medium hover:underline"
//             >
//               Sign in
//             </button>
//           </p>
//         </div>

//         {/* CAPTCHA placeholder */}
//         <div id="clerk-captcha" className="mt-4"></div>
//       </div>
//     </div>
//   );
// }
// src/pages/CustomSignUp.jsx



import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomSignUp() {
  const { signUp, isLoaded } = useSignUp();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "professional", // default
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded || loading) return;

    setLoading(true);
    setError("");

    try {
      // Create the user with email_link strategy
      await signUp.create({
        emailAddress: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        publicMetadata: { role: form.role },
      });

      // Send verification email with a link
      await signUp.prepareEmailAddressVerification({
        strategy: "email_link",
        redirectUrl: `${window.location.origin}/dashboard`, // link target
      });

      alert(
        "We sent a confirmation link to your email. Please click it to finish signing up."
      );

      navigate("/sign-in"); // user will log in after clicking the link
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.longMessage || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            Welcome! Please fill in the details to get started.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-red-700 text-sm">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Account type
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="professional">Professional</option>
              <option value="organization">Organization</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isLoaded}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending link...
              </>
            ) : (
              <>
                Continue
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/sign-in")}
              className="text-gray-900 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
