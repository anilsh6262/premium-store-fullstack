import { useState } from "react";
import { API } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async () => {
  try {
    await API.post("/api/auth/register", form);

    alert("Registered Successfully");
    navigate("/login");

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Registration Failed");
  }
};
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account ✨</h2>
        <p>Sign up to get started</p>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={registerUser}>Register</button>

        <p className="bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}