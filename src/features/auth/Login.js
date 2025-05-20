// src/components/Login.js
import React, { useState } from "react";
import { ref, child, get } from "firebase/database";
import { db } from "../../utils/firebase";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    try {
      const userRef = child(ref(db), `users/${username}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        return alert("User not found!");
      }
      const userData = snapshot.val();
      if (userData.password === password) {
        alert("Login successful!");
        // आगे का लॉजिक: स्टोर करें, रीडायरेक्ट करें आदि
      } else {
        alert("Incorrect password!");
      }
    } catch (err) {
      console.error(err);
      alert("Login error – check console");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input name="username" value={formData.username}
                   onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password"
                   value={formData.password}
                   onChange={handleChange} required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
