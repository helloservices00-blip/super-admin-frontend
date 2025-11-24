import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductsPage = () => {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://super-backend-bzin.onrender.com/api/products/vendor/${vendorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, [vendorId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <ul>
        {products.map(p => <li key={p._id}>{p.name} - ${p.price}</li>)}
      </ul>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default ProductsPage;
