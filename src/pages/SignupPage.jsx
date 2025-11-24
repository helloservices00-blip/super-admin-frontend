import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [module, setModule] = useState("");          // selected module
  const [modules, setModules] = useState([]);        // modules list
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch backend modules on mount
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await fetch("https://super-backend-bzin.onrender.com/api/modules");
        const data = await res.json();
        setModules(data);
        if (data.length > 0) setModule(data[0]._id); // default to first module
      } catch (err) {
        console.error("Failed to fetch modules:", err);
        setError("Failed to load modules. Try again later.");
      }
    };
    fetchModules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!module) {
        setError("Please select a module.");
        setLoading(false);
        return;
      }

      const response = await fetch("https://super-backend-bzin.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, module }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            style={styles.input}
          >
            {modules.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f2f2f2" },
  card: { width: "350px", padding: "25px", background: "#fff", borderRadius: "10px", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "12px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "12px", fontSize: "16px", background: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "red", marginTop: "10px" }
};

export default SignupPage;
