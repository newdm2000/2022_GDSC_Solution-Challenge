import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "fbase";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainPage from "routes/MainPage";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

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
