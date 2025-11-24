import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import VendorsPage from "./pages/VendorsPage";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/modules/:moduleId/vendors" element={<ProtectedRoute><VendorsPage /></ProtectedRoute>} />
        <Route path="/vendors/:vendorId/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
