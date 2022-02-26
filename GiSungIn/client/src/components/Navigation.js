import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    getAuth().signOut();
    navigate("/");
  };
  const onLogInClick = () => {
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lecture">lectures</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            {isLoggedIn ? (
              <button onClick={onLogOutClick}>LogOut</button>
            ) : (
              <button onClick={onLogInClick}>LogIn</button>
            )}
          </ul>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
