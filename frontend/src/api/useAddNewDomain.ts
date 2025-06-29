import baseAPI from "./base";
import { useState } from "react";

const useAddNewDomain = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addNewDomain = async (domain: string) => {
    if (!domain) {
      setError("Domain name is required");
      return;
    }
    setLoading(true);
    try {
      const res = await baseAPI.post("/v1/domains/add", { name: domain });
      if (res.data.status === "success") {
        setError(""); // Clear any previous errors
        return res.data; // Return the newly added domain data
      }
    } catch (err: any) {
      setError(err.response?.data?.error ?? "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addNewDomain,
  };
};

export default useAddNewDomain;
