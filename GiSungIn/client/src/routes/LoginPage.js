import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/system";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = authService;

  const onRegister = (event) => {
    navigate("/register");
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const onSocialClick = async (event) => {
    const auth = authService;
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    navigate("/");
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            type="email"
            required
            fullWidth
            autoFocus
            name="email"
            id="email"
            autoComplete="email"
            label="Email Address"
            value={email}
            onChange={onChange}
          />
          <TextField
            name="password"
            type="password"
            fullWidth
            margin="normal"
            label="Password"
            id="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={onChange}
          />

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {error}
        </Box>
        <Grid container>
          <Grid item xs>
            <Button
              sx={{ mt: 3, mb: 2, mr: 1, fontSize:12 }}
              variant="outlined"
              onClick={onSocialClick}
              name="google"
            >
              Continue with Google
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: 3, mb: 2, ml: 1, fontSize:12}}
              variant="outlined"
              onClick={onSocialClick}
              name="github"
            >
              Continue with Github
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default LoginPage;