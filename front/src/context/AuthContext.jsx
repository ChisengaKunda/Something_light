// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const AuthContext = createContext({
  auth: { token: null, role: null, username: null },
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  // 1) Initialize from localStorage for an indefinite session
  const [auth, setAuth] = useState(() => ({
    token:    localStorage.getItem("token"),
    role:     localStorage.getItem("role"),
    username: localStorage.getItem("username"),
  }));

  const navigate = useNavigate();

  // Whenever token changes, install/remove the header on api
  useEffect(() => {
    if (auth.token) {
      api.defaults.headers.common["Authorization"] = `Basic ${auth.token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [auth.token]);

  // Attempt login by encoding creds and hitting /users/me
  const login = async (username, password) => {
    const token = btoa(`${username}:${password}`);
    try {
      const resp = await api.get("/users/me", {
        headers: { Authorization: `Basic ${token}` },
      });

      // 2) Persist into both state and localStorage
      setAuth({ token, role: resp.data.role, username });
      localStorage.setItem("token",    token);
      localStorage.setItem("role",     resp.data.role);
      localStorage.setItem("username", username);

      // Redirect to role-based home
      navigate(`/${resp.data.role}`, { replace: true });
    } catch (err) {
      throw new Error("Invalid credentials");
    }
  };

  // Register a new user (no change)
  const register = async (username, password, role = "nurse") => {
    await api.post(
      "/users/register",
      null,
      { params: { username, password, role } }
    );
  };

  // Clear auth state and go back to login
  const logout = () => {
    setAuth({ token: null, role: null, username: null });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
