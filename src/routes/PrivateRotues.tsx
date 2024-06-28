// src/routes/Routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";
import NotFound from "../components/errors/NotFound";

const PrivateRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default PrivateRoutes;
