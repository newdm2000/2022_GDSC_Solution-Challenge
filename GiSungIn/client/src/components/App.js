import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "fbase";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const auth = authService;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
        {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
    </ThemeProvider>
  );
}

export default App;
