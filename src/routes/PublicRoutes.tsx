import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLogin from "../pages/UserLogin";
import LandingPage from "../pages/Landing";
import UserSignUp from "../pages/UserSignUp";
import NotFound from "../components/errors/NotFound";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignUp />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
