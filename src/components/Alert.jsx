import { useEffect } from "react";

export default function Alert({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-green-100 border-green-500 text-green-800",
    error: "bg-red-100 border-red-500 text-red-800",
  };

  return (
    <div
      className={`p-3 border-l-4 rounded-md my-2 ${styles[type] || ""}`}
      role="alert"
    >
      {message}
    </div>
  );
}
