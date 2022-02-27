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

const Navigation = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    getAuth().signOut();
    navigate("/");
  };
  const onLogInClick = () => {
    navigate("/login");
  };
  const onSearchClick = () => {
    navigate("/search");
  };
  const onMineClick = () => {
    navigate("/mine");
  };
  const onSettingClick = () => {
    navigate("/setting");
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
            <Button variant="contained" onClick={onSearchClick}>
              Search
            </Button>
            <Button variant="contained" onClick={onMineClick}>
              Mine
            </Button>
            <Button variant="contained" onClick={onSettingClick}>
              Setting
            </Button>
          </ButtonGroup>
      </Grid>
    </Box>
  );
};

export default Navigation;
