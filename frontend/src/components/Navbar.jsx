import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        🛍️ Premium Store
      </div>

      <div className="nav-links">

        {!user ? (
          <>
            <Link to="/">Home</Link>

            <Link
              className="login-btn"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="register-btn"
              to="/register"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/products">
              Products
            </Link>

            {user.role === "admin" && (
              <Link
                className="dashboard-btn"
                to="/admin"
              >
                Dashboard
              </Link>
            )}

            <div className="user-info">
              👤 {user.name}
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}