import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";

function AuthGard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login");
      return;
    }

    if (location.pathname === "/login") return;
  }, [isAuthenticated, location]);

  return <div>{children}</div>;
}

export default AuthGard;
