import { useState } from "react";
import { API } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    if (e) e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", form);
      const data = res.data;

      console.log("LOGIN RESPONSE:", data);

      if (!data || !data.token) {
        throw new Error("Invalid login response");
      }

      const user = data.user || { role: "user" };

      // ✅ use context instead of direct localStorage
      login(user, data.token);

      alert("Login Successful");

      console.log("LOGIN USER:", user);

      // 🚀 role-based navigation
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products"); // better UX than home
      }

    } catch (err) {
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.log("ERROR:", err);
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue</p>

        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit">Login</button>
        </form>

        <p className="bottom-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}