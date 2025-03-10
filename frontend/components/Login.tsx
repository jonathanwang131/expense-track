"use client";

import { useState } from "react";
import axios from "axios";

const Login = ({ setIsAuthenticated }: { setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", { username, password });
      localStorage.setItem("access_token", response.data.access);  // Store the token in localStorage
      setIsAuthenticated(true);  // Set authentication status to true
      setError("");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;