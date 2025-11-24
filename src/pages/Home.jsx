// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [modules, setModules] = useState([]);
  const [shops, setShops] = useState({});
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      const resModules = await axios.get("https://super-backend-bzin.onrender.com/api/modules");
      setModules(resModules.data);

      // Fetch shops for each module
      const shopsData = {};
      for (let mod of resModules.data) {
        const resShops = await axios.get(`https://super-backend-bzin.onrender.com/api/shops/module/${mod._id}`);
        shopsData[mod._id] = resShops.data;
      }
      setShops(shopsData);

      // Fetch categories for each shop
      const categoriesData = {};
      for (let moduleId in shopsData) {
        for (let shop of shopsData[moduleId]) {
          const resCats = await axios.get(`https://super-backend-bzin.onrender.com/api/categories/shop/${shop._id}`);
          categoriesData[shop._id] = resCats.data;
        }
      }
      setCategories(categoriesData);

      // Fetch products for each category
      const productsData = {};
      for (let shopId in categoriesData) {
        for (let cat of categoriesData[shopId]) {
          const resProds = await axios.get(`https://super-backend-bzin.onrender.com/api/products/category/${cat._id}`);
          productsData[cat._id] = resProds.data;
        }
      }
      setProducts(productsData);
    };

    fetchModules();
  }, []);

  return (
    <div>
      {modules.map(mod => (
        <div key={mod._id}>
          <h2>{mod.name}</h2>
          {shops[mod._id]?.map(shop => (
            <div key={shop._id} style={{ marginLeft: "20px" }}>
              <h3>{shop.name}</h3>
              {categories[shop._id]?.map(cat => (
                <div key={cat._id} style={{ marginLeft: "40px" }}>
                  <h4>{cat.name}</h4>
                  {products[cat._id]?.map(prod => (
                    <div key={prod._id} style={{ marginLeft: "60px" }}>
                      <p>{prod.name} - ${prod.price}</p>
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
