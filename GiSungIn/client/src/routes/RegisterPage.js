import { authService, dbService } from "fbase";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc, } from "firebase/firestore";
import {
  Container,
  Box,
  TextField,
  Avatar,
  Typography,
  Grid,
  Link,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const RegisterPage = () => {
  const yr = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState(0);
  const auth = authService;
  const db = dbService;

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "firstname") {
      setFirstName(value);
    } else if (name === "confirmpassword") {
      setConfirmPassword(value);
    } else if (name === "lastname") {
      setLastName(value);
    } else if (name === "age") {
      setAge(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(dbService,"Users", authService.currentUser.uid), {
          uid: authService.currentUser.uid,
          firstname: firstName,
          lastname: lastName,
          email: email,
          age: age,
          lectures: [],
        });
      } else {
        setError("Not Confirm Password");
      }
    } catch (error) {
      setError(error.message);
    }
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
          Sign Up
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
            required
            value={password}
            onChange={onChange}
          />
          <TextField
            name="confirmpassword"
            type="password"
            fullWidth
            margin="normal"
            label="ConfirmPassword"
            id="confirmpassword"
            required
            value={confirmPassword}
            onChange={onChange}
          />
          <Grid container>
            <Grid item xs>
              <TextField
                sx={{ mr: 1 }}
                name="firstname"
                type="text"
                fullWidth
                margin="normal"
                label="firstname"
                id="firstname"
                required
                value={firstName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs>
              <TextField
                sx={{ ml: 1 }}
                name="lastname"
                type="text"
                fullWidth
                margin="normal"
                label="lastname"
                id="lastname"
                required
                value={lastName}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <TextField
            name="age"
            type="number"
            fullWidth
            margin="normal"
            label="age"
            id="age"
            required
            value={age}
            onChange={onChange}
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Login" variant="body2">
                {"Already Have Account? Sign In"}
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
