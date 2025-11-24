import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Home() {
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([]);
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [modRes, shopRes, catRes, subRes, prodRes] = await Promise.all([
          fetch("https://super-backend-bzin.onrender.com/api/modules", { headers }).then(r => r.json()),
          fetch("https://super-backend-bzin.onrender.com/api/shops", { headers }).then(r => r.json()),
          fetch("https://super-backend-bzin.onrender.com/api/categories", { headers }).then(r => r.json()),
          fetch("https://super-backend-bzin.onrender.com/api/subcategories", { headers }).then(r => r.json()),
          fetch("https://super-backend-bzin.onrender.com/api/products", { headers }).then(r => r.json()),
        ]);

        setModules(modRes);
        setShops(shopRes);
        setCategories(catRes);
        setSubcategories(subRes);
        setProducts(prodRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  if (!user) return <p>Please login to see products and modules.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {modules.map((mod) => (
        <div key={mod._id} style={{ marginBottom: "20px" }}>
          <h2>{mod.name}</h2>
          {shops.filter(s => s.moduleId === mod._id).map(shop => (
            <div key={shop._id} style={{ marginLeft: "20px" }}>
              <h3>{shop.name}</h3>
              {categories.filter(c => c.shopId === shop._id).map(cat => (
                <div key={cat._id} style={{ marginLeft: "20px" }}>
                  <h4>{cat.name}</h4>
                  {subcategories.filter(sc => sc.categoryId === cat._id).map(sub => (
                    <div key={sub._id} style={{ marginLeft: "20px" }}>
                      <h5>{sub.name}</h5>
                      <ul>
                        {products
                          .filter(p => p.subcategoryId === sub._id)
                          .map(p => (
                            <li key={p._id}>{p.name} - ${p.price}</li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
