import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, reidrectPath = "/login", children }) => {
  //Confirm if it exists logged user data
  if (!user) {
    return <Navigate to={reidrectPath} replace />;
  }

  return children;
};

export { ProtectedRoute };
