import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Home() {
  const { user, token } = useContext(AuthContext);
  const [modules, setModules] = useState([]);
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [modulesRes, shopsRes, categoriesRes, subcategoriesRes, productsRes] = await Promise.all([
          axios.get("https://super-backend-bzin.onrender.com/api/modules", config),
          axios.get("https://super-backend-bzin.onrender.com/api/shops", config),
          axios.get("https://super-backend-bzin.onrender.com/api/categories", config),
          axios.get("https://super-backend-bzin.onrender.com/api/subcategories", config),
          axios.get("https://super-backend-bzin.onrender.com/api/products", config),
        ]);

        setModules(modulesRes.data);
        setShops(shopsRes.data);
        setCategories(categoriesRes.data);
        setSubcategories(subcategoriesRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user, token]);

  if (!user || !token) return <p>Please login to see products and modules.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}!</h1>

      <h2>Modules</h2>
      <ul>
        {modules.map((mod) => (
          <li key={mod._id}>{mod.name}</li>
        ))}
      </ul>

      <h2>Products</h2>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            {prod.name} - ${prod.price} ({prod.vendorId?.name || "No vendor"})
          </li>
        ))}
      </ul>
    </div>
  );
}
