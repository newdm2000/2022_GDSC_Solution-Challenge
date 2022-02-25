import { authService, dbService } from "fbase";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const RegisterPage = () => {
  const yr = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [birthdate, setBirthdate] = useState(0);
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
    } else if (name === "name") {
      setName(value);
    } else if (name === "confirmpassword") {
      setConfirmPassword(value);
    } else if (name === "birthdate") {
      setBirthdate(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const age = yr - birthdate / 10000 + 1;
    try {
      if (password === confirmPassword) {
        console.log("A");
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("B");
        await addDoc(collection(db, "Users"), {
          uid: authService.currentUser.uid,
          name: name,
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          name="confirmpassword"
          type="password"
          placeholder="ConfirmPassword"
          required
          value={confirmPassword}
          onChange={onChange}
        />
        <input
          name="name"
          type="text"
          placeholder="name"
          required
          value={name}
          maxLength={5}
          onChange={onChange}
        />
        <input
          name="birthdate"
          type="number"
          placeholder="yyyymmdd"
          required
          value={birthdate}
          onChange={onChange}
        />
        <input type="submit" value="Register" />
        {error}
      </form>
    </div>
  );
};

export default RegisterPage;
