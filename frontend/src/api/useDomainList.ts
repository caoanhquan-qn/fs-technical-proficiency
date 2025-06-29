import baseAPI from "./base";
import { useState, useEffect } from "react";
import { IDomain } from "../interfaces";

const useDomainList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [domains, setDomains] = useState<IDomain[]>([]);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    setLoading(true);
    try {
      const res = await baseAPI.get("/v1/domains/getAll");
      setDomains(res.data.data as IDomain[]);
    } catch (err: any) {
      setError(err.response?.data?.error ?? "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    domains,
    fetchDomains,
  };
};

export default useDomainList;
