import baseAPI from "./base";
import { useState } from "react";

const useLogin = (username: string, password: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState(null);

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    setLoading(true);
    try {
      const response = await baseAPI.post("/v1/users/login", {
        username,
        password,
      });
      setData(response.data);
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
    data,
    handleLogin,
  };
};

export default useLogin;
