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

const Navigation = ({ isLoggedIn, isAdmin }) => {
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
  const onAdminClick = () => {
    navigate("/admin");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar disableGutters sx= {{display : "flex", justifyContent : "flex-end", mr : "8px"}}>
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
          <ButtonGroup variant="text" aria-label="text button group" sx = {{mt : "3px", width : 1}}>
            <Grid sx = {{width : 1, display : "flex", flexWrap : "wrap"}}>
              <Button variant="contained" onClick={onSearchClick} sx = {{flex : "1 1 30%"}}>
                Search
              </Button>
              <Button variant="contained" onClick={onMineClick} sx = {{flex : "1 1 30%"}}>
                Mine
              </Button>
              <Button variant="contained" onClick={onSettingClick} sx = {{flex : "1 1 30%"}}>
                Setting
              </Button>
            {isAdmin ? (<Button variant="contained" onClick={onAdminClick} sx = {{flex : "1 1 30%"}}>Admin</Button>) : (<></>)}
            </Grid>
          </ButtonGroup>
      </Grid>
    </Box>
  );
};

export default Navigation;
