import { useState } from "react";
import { API } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    if (e) e.preventDefault();

    try {
     const res = await API.post("/api/auth/login", form);

console.log("FULL RESPONSE:", res);

const data = res.data;

console.log("DATA:", data);
      // ✅ validate response
      if (!data || !data.token) {
        throw new Error("Invalid login response");
      }

     const user = data.user || { role: "user" };

console.log("USER OBJECT:", user);
localStorage.setItem("user", JSON.stringify(user));
console.log(
  "SAVED USER:",
  localStorage.getItem("user")
);
      // ✅ save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful");

      console.log("LOGIN USER:", user);

      // 🚀 FIXED ADMIN REDIRECT
      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
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