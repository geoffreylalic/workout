import { me } from "../../queries/authentication";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const { data, isLoading } = useQuery(me);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <AuthContext.Provider value={{ user: data }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
