// src/features/auth/Login.js
import React, { useState } from "react";
import { ref, child, get } from "firebase/database";
import { db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { username, password } = formData;
    try {
      const userRef = child(ref(db), `users/${username}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        setLoading(false);
        setError("User not found!");
        return;
      }
      const userData = snapshot.val();
      if (userData.password === password) {
        // Store user data in localStorage
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            username: username,
            userType: userData.userType,
            userid: userData.userid,
          })
        );
        // Route to user type home page
        const userTypeRoute = "/" + userData.userType.split("_")[0];
        setLoading(false);
        navigate(userTypeRoute, { replace: true });
      } else {
        setLoading(false);
        setError("Incorrect password!");
      }
    } catch (err) {
      setLoading(false);
      setError("Login error – check console");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
