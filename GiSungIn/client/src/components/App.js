import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "fbase";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainPage from "routes/MainPage";
import { doc, getDoc, getFirestore, query, where } from "firebase/firestore";
import { async } from "@firebase/util";
import { dbService } from "fbase";

const theme = createTheme({
  palette: {
    type : 'dark',
    primary: {
      light: "#757ce8",
      main: '#202020',
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    settings: {
      main : "#eeeeee",
      dark : "#eeeeee",
    },
  },
});

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const auth = authService;

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log(auth.currentUser.uid);
        const docRef = doc(dbService, "Users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setIsAdmin(docSnap.data().isAdmin);
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      ) : (
        "Initializing..."
      )}
    </ThemeProvider>
  );
}

export default App;
