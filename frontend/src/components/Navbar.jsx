import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  useEffect(() => {
    const syncUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      setUser(savedUser);
    };

    window.addEventListener("authChange", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("authChange", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">🛍️ Premium Store</div>

      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/">Home</Link>
            <Link className="login-btn" to="/login">Login</Link>
            <Link className="register-btn" to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>

            {user.role === "admin" && (
              <Link className="dashboard-btn" to="/admin">
                Dashboard
              </Link>
            )}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}