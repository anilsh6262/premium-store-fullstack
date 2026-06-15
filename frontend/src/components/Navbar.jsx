import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clear auth state
    navigate("/");     // redirect to home
  };

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
          </>
        )}

        {/* USER */}
        {user && user.role === "user" && (
          <>
            <Link to="/products">Products</Link>
           
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* ADMIN */}
        {user && user.role === "admin" && (
          <>
            <Link to="/admin">Admin panel</Link>
            
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}