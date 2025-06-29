import baseAPI from "./base";
import { useState } from "react";

const useLogin = (username: string, password: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    setLoading(true);
    try {
      const response = await baseAPI.post("/v1/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error ?? "An unknown error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleLogin,
  };
};

export default useLogin;
