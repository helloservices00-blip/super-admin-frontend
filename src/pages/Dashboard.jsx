import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [shops, setShops] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser || !token) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));

    // Fetch all modules, shops, vendors, products
    const fetchData = async () => {
      try {
        const [modulesRes, shopsRes, vendorsRes, productsRes] = await Promise.all([
          fetch("https://super-backend-bzin.onrender.com/api/modules"),
          fetch("https://super-backend-bzin.onrender.com/api/shops"),
          fetch("https://super-backend-bzin.onrender.com/api/vendors"),
          fetch("https://super-backend-bzin.onrender.com/api/products"),
        ]);

        const [modulesData, shopsData, vendorsData, productsData] = await Promise.all([
          modulesRes.json(),
          shopsRes.json(),
          vendorsRes.json(),
          productsRes.json(),
        ]);

        setModules(modulesData);
        setShops(shopsData);
        setVendors(vendorsData);
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [navigate, token]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}!</h1>

      <h2>Modules:</h2>
      <ul>
        {modules.map((mod) => (
          <li key={mod._id}>
            <Link to={`/modules/${mod._id}/vendors`}>{mod.name}</Link>
          </li>
        ))}
      </ul>

      <h2>Shops:</h2>
      <ul>
        {shops.map((shop) => (
          <li key={shop._id}>{shop.name}</li>
        ))}
      </ul>

      <h2>Vendors:</h2>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor._id}>{vendor.name}</li>
        ))}
      </ul>

      <h2>Products:</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} (Vendor: {product.vendorId?.name || "N/A"})
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
};

export default Dashboard;
