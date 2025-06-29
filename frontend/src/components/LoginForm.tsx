import React, { useState } from "react";
import useLogin from "../api/useLogin";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, handleLogin } = useLogin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleLogin(username, password);
    if (success) {
      router.push("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
