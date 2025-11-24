import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, token, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user && token) {
      const fetchData = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        try {
          const [modulesRes, shopsRes, productsRes] = await Promise.all([
            fetch("https://super-backend-bzin.onrender.com/api/modules", { headers }),
            fetch("https://super-backend-bzin.onrender.com/api/shops", { headers }),
            fetch("https://super-backend-bzin.onrender.com/api/products", { headers }),
          ]);
          setModules(await modulesRes.json());
          setShops(await shopsRes.json());
          setProducts(await productsRes.json());
        } catch (err) {
          console.error("Failed to fetch navbar data:", err);
        }
      };
      fetchData();
    }
  }, [user, token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartCount = cart.reduce((acc, i) => acc + (i.quantity || 1), 0);

  return (
    <nav className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MultiVendor</Link>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            Cart
            <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
          </Link>

          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <div className="flex space-x-2">
                <Link className="text-sm text-blue-600" to="/modules">
                  Modules ({modules.length})
                </Link>
                <Link className="text-sm text-green-600" to="/shops">
                  Shops ({shops.length})
                </Link>
                <Link className="text-sm text-purple-600" to="/products">
                  Products ({products.length})
                </Link>
              </div>
              <button onClick={logout} className="text-sm text-red-600 ml-2">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-blue-600">Login / Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
