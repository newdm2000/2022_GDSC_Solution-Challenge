import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  ButtonGroup,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navigation = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    getAuth().signOut();
    navigate("/");
  };
  const onLogInClick = () => {
    navigate("/login");
  };
  const onHomeClick = () => {
    navigate("/");
  };
  const onLecturesClick = () => {
    navigate("/lecture");
  };
  const onProfileClick = () => {
    navigate("/profile");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar disableGutters>
        {isLoggedIn ? (
            <Button variant="outlined" color="secondary" onClick={onLogOutClick}>
              LogOut
            </Button>
          ) : (
            <Button variant="outlined" color="secondary" onClick={onLogInClick}>
              LogIn
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Grid container>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button variant="contained" onClick={onHomeClick}>
              Home
            </Button>
            <Button variant="contained" onClick={onLecturesClick}>
              lectures
            </Button>
            <Button variant="contained" onClick={onProfileClick}>
              Profile
            </Button>
          </ButtonGroup>
      </Grid>
    </Box>
  );
};

export default Navigation;
