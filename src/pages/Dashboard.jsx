import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);

  const backendUrl = "https://super-backend-bzin.onrender.com";

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    async function fetchModules() {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${backendUrl}/api/modules`, config);
        setModules(res.data);
      } catch (err) {
        console.error("Error fetching modules:", err);
      }
    }

    fetchModules();
  }, [user, token, navigate]);

  if (!user) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}!</h1>
      <h2>Your Modules:</h2>
      <ul>
        {modules.map(mod => (
          <li key={mod._id}>
            <Link to={`/modules/${mod._id}/vendors`}>{mod.name}</Link>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }}
        style={{ marginTop: "20px", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
}
