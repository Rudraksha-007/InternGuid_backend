import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  const storedToken = localStorage.getItem("token");
  const authToken = token || storedToken;

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
