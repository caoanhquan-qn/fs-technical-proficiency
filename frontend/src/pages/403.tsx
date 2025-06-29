import React from "react";
import { useRouter } from "next/router";

export default function Forbidden() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: "bold",
          color: "#dc2626",
          margin: "0",
        }}
      >
        403
      </h1>

      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#374151",
          margin: "1rem 0",
        }}
      >
        Access Forbidden
      </h2>

      <p
        style={{
          fontSize: "1.125rem",
          color: "#6b7280",
          maxWidth: "32rem",
          margin: "1rem 0 2rem 0",
        }}
      >
        You don't have permission to access this page. Please log in to
        continue.
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={handleGoToLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
