import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">🛍️ Premium Store</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Admin Login</Link>
      </div>
    </nav>
  );
}