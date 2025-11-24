import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MultiVendor</Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <button onClick={logout} className="text-sm text-red-600">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-blue-600">Login / Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
