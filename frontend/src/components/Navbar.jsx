import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <h2 className="logo">🛍️ Premium Store</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <Link to="/admin">Dashboard</Link>
            )}

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}