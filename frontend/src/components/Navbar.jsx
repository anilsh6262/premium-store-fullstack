import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = JSON.parse(
        localStorage.getItem("user")
      );
      setUser(savedUser);
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        🛍️ Premium Store
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">
          Products
        </Link>

        {!user ? (
          <>
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