import React from "react";
import { Container } from "@mui/material";
import MainPost from "components/mainpage/MainPost";



const MainPage = () => {
  return (
    <Container disableGutters maxWidth = "1g">
      <main>
        <MainPost />
      </main>
    </Container>
  );
};

export default MainPage;
