import { useState, useEffect } from "react";
import { me } from "../../queries/authentication";
import AuthContext from "./AuthContext";
import { useQuery } from "@tanstack/react-query";

const AuthProvider = ({ children }) => {
  const { isSuccess, isError, isLoading } = useQuery(me);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsAuthenticated(true);
    }
    if (isSuccess) {
      setIsAuthenticated(true);
      return;
    }
    if (isError) {
      setIsAuthenticated(false);
      return;
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
