import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { addDoc, doc, collection } from "firebase/firestore";
import { dbService } from "fbase";

function AddLecture() {
  const [lecBrand, setLecBrand] = useState("");
  const [lecName, setLecName] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "lecBrand") {
      setLecBrand(value);
    } else if (name === "lecName") {
      setLecName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "Lectures"), {
      lecBrand: lecBrand,
      lecName: lecName,
    });
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="lecName"
        id="lecName"
        label="Brand"
        value={lecName}
        onChange={onChange}
      />
      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="lecBrand"
        id="lecBrand"
        label="Brand"
        value={lecBrand}
        onChange={onChange}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}

export default AddLecture;
