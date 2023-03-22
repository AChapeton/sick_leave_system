import { Navigate } from "react-router-dom";
import { useLogin } from "./store";

const ProtectedRoute = ({ reidrectPath = "/login", children }) => {
  //Calls logged user data from state
  const loggedUser = useLogin((state) => state.loggedUser);
  //Confirm if it exists logged user data
  if (!loggedUser) {
    return <Navigate to={reidrectPath} />;
  }

  return children;
};

export { ProtectedRoute };
