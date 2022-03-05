import { CssBaseline, Grid } from "@mui/material";
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
import Paper from "@mui/material/Paper";
import Search from "./Banner/Search";
import Mine from "./Banner/Mine";
import Setting from "./Banner/Setting";
import Bsearch from "./body/Bsearch";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <CssBaseline />
      {isLoggedIn ? (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={8}
            md={3}
            component={Paper}
            elevation={6}
            square
          >
            <Navigation isLoggedIn={isLoggedIn} />
            <Routes>
              <Route path="/" element={<div>hi</div>} />
              <Route path="/search/*" element={<Search />} />
              <Route path="/mine/*" element={<Mine />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/lecture/*" element={<Lecture />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Grid>
          <Grid item xs={false} sm={4} md={9}>
            <Routes>
              <Route path="/" element={<div>hi</div>} />
              <Route path="/search/:key" element={<Bsearch />} />
              <Route path="/mine/*" element={<Mine />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/lecture/:key" element={<Lecture />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Grid>
        </Grid>
      ) : (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
