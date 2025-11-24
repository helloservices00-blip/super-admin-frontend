import React, { useEffect, useState, useContext } from "react";
import { getProducts } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts(); // Axios will include token if present
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [token]); // ✅ refetch if token changes (login/logout)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{p.name}</h2>
          <p>Price: ${p.price}</p>
          <p>{p.description}</p>
        </div>
      ))}
      {products.length === 0 && <p>No products found.</p>}
    </div>
  );
}
