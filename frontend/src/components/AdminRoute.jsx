import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("USER:", user);
    console.log("ADMIN ROUTE USER:", user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    console.log("ROLE:", user.role);
    return <Navigate to="/" />;
  }

  return children;
}