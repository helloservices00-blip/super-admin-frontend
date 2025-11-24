import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    // Fetch modules after login
    const fetchModules = async () => {
      try {
        const res = await fetch("https://super-backend-bzin.onrender.com/api/modules", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setModules(data);
      } catch (err) {
        console.error("Failed to fetch modules:", err);
      }
    };

    fetchModules();
  }, [user, token, navigate]);

  if (!user) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}!</h1>
      <h2>Your Modules:</h2>
      {modules.length === 0 ? (
        <p>No modules found.</p>
      ) : (
        <ul>
          {modules.map((mod) => (
            <li key={mod._id}>
              <Link to={`/modules/${mod._id}/vendors`}>{mod.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
