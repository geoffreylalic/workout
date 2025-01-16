import { useNavigate } from "react-router-dom";
import { me } from "../queries/authentication";
import AuthContext from "./AuthContext";
import { useQuery } from "@tanstack/react-query";

const AuthProvider = ({ children }) => {
  const { _, error } = useQuery(me);
  console.log(_, error);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthProvider;
