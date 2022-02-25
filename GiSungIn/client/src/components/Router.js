import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Lecture from "routes/Lecture";
import LoginPage from "routes/LoginPage";
import MainPage from "routes/MainPage";
import RegisterPage from "routes/RegisterPage";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Navigation isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lecture" element={<Lecture />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
