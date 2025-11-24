// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { setAuthToken } from "../api/api.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Restore auth state on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken); // set Axios default header
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Whenever token changes, update Axios header
  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
