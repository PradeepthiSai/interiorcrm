import { useState } from "react";
import axios from "axios";
import { getApiUrl } from "./utils";
import "./Login.css";

function Login({ onLoginSuccess, onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(
        getApiUrl(endpoint),
        isLogin
          ? { email: form.email, password: form.password }
          : form
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      onLoginSuccess(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="back-home" onClick={onBack}>
          ← Back to Welcome
        </button>
        <div className="login-header">
          <div className="brand-signature">
            <span className="brand-mark">🪶</span>
            <div>
              <p className="brand-title">InteriorCRM</p>
              <p className="brand-caption">Studio CRM for luxury interiors</p>
            </div>
          </div>
          <h1>Welcome Back</h1>
          <p className="subtitle">Securely manage leads, notes, and proposals in one refined workspace.</p>
        </div>

        <div className="login-toggle">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Studio Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Studio Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading
              ? "Processing..."
              : isLogin
              ? "Login to Dashboard"
              : "Create Account"}
          </button>
        </form>

        <div className="login-footer">
          <p>Professional CRM for Interior Design Studios</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
