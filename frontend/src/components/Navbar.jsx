import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h2 className="logo">🛍️ Premium Store</h2>

      <div className="nav-links">
        {/* Always visible */}
        <Link to="/">Home</Link>

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/admin-login">Admin Login</Link>
          </>
        )}

        {/* USER LOGGED IN */}
        {user && user.role === "user" && (
          <>
            <Link to="/products">Products</Link>
            <Link to="/profile">User Info</Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}

        {/* ADMIN LOGGED IN */}
        {user && user.role === "admin" && (
          <>
            <Link to="/admin">Admin Panel</Link>
            <Link to="/admin-profile">Admin Info</Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}