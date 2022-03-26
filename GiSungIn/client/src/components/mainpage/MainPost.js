import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/mainpage/Header";

const mainpost = {
  title: "Find the skills for me",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
};

const MainPost = () => {
  const navigate = useNavigate();
  const onRegisterClick = () => {
    navigate("/register");
  };
  return (
    <>
      <Paper
        sx={{
          height: "700px",
          width: "100%",
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${mainpost.image})`,
        }}
      >
        {
          <img
            style={{ display: "none" }}
            src={mainpost.image}
            alt={mainpost.imageText}
          />
        }
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0, 0.5)",
          }}
        />
        <Header />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "100%",
            width: "100%",
            position: "relative",
            pr: { md: 0 },
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            color="inherit"
            gutterBottom
            sx={{ mt: 10, mb: 10 }}
          >
            {mainpost.title}
          </Typography>
          <Button
            onClick={onRegisterClick}
            variant="contained"
            color="primary"
            size="large"
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default MainPost;
