import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}!</h1>
      <h2>Your Modules:</h2>
      <ul>
        {user.modules.map((mod) => (
          <li key={mod._id}>
            <Link to={`/modules/${mod._id}/vendors`}>{mod.name}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }} style={{ marginTop: "20px", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
