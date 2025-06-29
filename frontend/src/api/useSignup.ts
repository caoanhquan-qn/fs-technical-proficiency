import { useState } from "react";
import baseAPI from "./base";

const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignup = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError("");

    try {
      const response = await baseAPI.post("/v1/auth/signup", {
        username,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.response?.data?.error ?? "Signup failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSignup,
  };
};

export default useSignup;
