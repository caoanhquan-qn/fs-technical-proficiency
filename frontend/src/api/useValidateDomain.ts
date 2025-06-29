import baseAPI from "./base";
import { useState, useCallback } from "react";
import { IDomainDetail } from "../interfaces"; // Assuming you have an interface for domain details

const useValidateDomain = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<IDomainDetail | null>(null);

  const validateDomain = useCallback(async (domain: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await baseAPI.post("/v1/domains/validate", { domain });
      setData(response.data);
      setError(""); // Clear any previous errors
    } catch (err: any) {
      setError(err.response?.data?.error ?? "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    validateDomain,
  };
};

export default useValidateDomain;
