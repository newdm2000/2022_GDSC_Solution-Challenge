import { Button, Container, Link, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  { title: "GiSungIn", url: "#" }
];

function Header() {
  const navigate = useNavigate();
  const onLogInClick = () => {
    navigate("/login");
  };
  return (
    <Container disableGutters maxWidth="1g">
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
        <Button
          onClick={onLogInClick}
          variant="contained"
          color="primary"
          size="small"
        >
          Log In
        </Button>
      </Toolbar>
    </Container>
  );
}

export default Header;
