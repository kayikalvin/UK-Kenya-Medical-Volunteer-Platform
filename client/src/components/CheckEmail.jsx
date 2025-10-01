export default function CheckEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-xl font-semibold mb-4">Almost done!</h1>
        <p className="text-gray-700 mb-4">
          We sent a confirmation link to your email. Click it to verify your account.
        </p>
        <p className="text-gray-500 text-sm">
          After verification, return to the sign-in page to log in.
        </p>
      </div>
    </div>
  );
}
