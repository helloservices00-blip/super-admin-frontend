import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const VendorsPage = () => {
  const { moduleId } = useParams();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://super-backend-bzin.onrender.com/api/vendors/module/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setVendors(data);
    };
    fetchVendors();
  }, [moduleId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vendors</h1>
      <ul>
        {vendors.map(v => (
          <li key={v._id}>
            <Link to={`/vendors/${v._id}/products`}>{v.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default VendorsPage;
