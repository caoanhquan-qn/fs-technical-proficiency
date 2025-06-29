import React, { useState } from "react";
import useLogin from "../api/useLogin";
import useSignup from "../api/useSignup";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupMode, setIsSignupMode] = useState(false);
  const { loading: loginLoading, error: loginError, handleLogin } = useLogin();
  const { loading: signupLoading, error: signupError, handleSignup } = useSignup();
  const router = useRouter();

  const loading = loginLoading || signupLoading;
  const error = loginError || signupError;
  
  const getButtonText = () => {
    if (loading) return "Processing...";
    return isSignupMode ? "Sign Up" : "Log In";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignupMode) {
      const success = await handleSignup(username, password);
      if (success) {
        // After successful signup, switch to login mode or redirect
        setIsSignupMode(false);
        setUsername("");
        setPassword("");
        // Or you could redirect directly: router.push("/dashboard");
      }
    } else {
      const success = await handleLogin(username, password);
      if (success) {
        router.push("/dashboard");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">
        {isSignupMode ? "Sign Up" : "Login"}
      </h2>

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
        className={`w-full text-white py-2 px-4 rounded ${
          isSignupMode 
            ? "bg-pink-600 hover:bg-pink-700" 
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {getButtonText()}
      </button>
      
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => {
            setIsSignupMode(!isSignupMode);
            setUsername("");
            setPassword("");
          }}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          {isSignupMode 
            ? "Already have an account? Log in" 
            : "Don't have an account? Sign up"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
