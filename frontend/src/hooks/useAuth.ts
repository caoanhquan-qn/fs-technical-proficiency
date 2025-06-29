import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      router.push("/403");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return {
    isAuthenticated,
  };
};

export default useAuth;
