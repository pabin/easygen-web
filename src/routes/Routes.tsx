// src/routes/Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";
import UserLogin from "../pages/UserLogin";
import LandingPage from "../pages/Landing";
import UserSignUp from "../pages/UserSignUp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/" element={<UserLogin />} /> */}
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignUp />} />
      {/* <PrivateRoute path="/dashboard" component={DashboardPage} /> */}
    </Routes>
  );
};

export default AppRoutes;
