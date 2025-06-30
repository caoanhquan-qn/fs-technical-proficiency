import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  const validateToken = async (token: string | null): Promise<boolean> => {
    if (!token) {
      localStorage.removeItem("token");
      return false;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/domains/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        return true;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      localStorage.removeItem("token");
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const isValidToken = await validateToken(token);

      if (!isValidToken) {
        setIsAuthenticated(false);
        router.push("/403");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  return {
    isAuthenticated,
  };
};

export default useAuth;
