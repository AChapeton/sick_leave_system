import { useLogin } from "./store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedUser = useLogin((state) => state.loggedUser);
  console.log("verify", loggedUser);
  if (!loggedUser) {
    return <Navigate to="/login" />;
  }
};

export { ProtectedRoute };
