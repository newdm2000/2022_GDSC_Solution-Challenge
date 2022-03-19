import React, { useEffect, useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { addDoc, doc, collection } from "firebase/firestore";
import { dbService } from "fbase";
import { category_list } from "data";
import { useNavigate } from "react-router-dom";

function AddLecture() {
  const [lecBrand, setLecBrand] = useState("");
  const [lecDescription, setLecDescription] = useState("")
  const [lecName, setLecName] = useState("");
  const [lecImg, setLecImg] = useState("");
  const [lecUrl, setLecUrl] = useState("");
  const [lecPrice, setLecPrice] = useState(0);
  const [lecField, setLecField] = useState([]);
  const [cnt, setCnt] = useState(0);
  const navigate = useNavigate();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "lecBrand") {
      setLecBrand(value);
    } else if (name === "lecName") {
      setLecName(value);
    } else if (name === "lecPrice") {
      setLecPrice(value);
    } else if (name === "lecImg") {
      setLecImg(value);
    } else if (name === "lecUrl") {
      setLecUrl(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "Lectures"), {
      lecBrand: lecBrand,
      lecName: lecName,
      lecImg: lecImg,
      lecUrl: lecUrl,
      lecPrice: lecPrice,
      lecField: lecField,
    });
    alert("Success");
    navigate("/");
  };

  const onClickPop = async (event) => {
    const cat = lecField;
    for (let i = 0; i < cat.length; i++) {
      if (cat[i] === event.target.name) {
        cat.splice(i, 1);
        i--;
      }
    }
    setLecField(cat);
    setCnt(cnt + 1);
    console.log(lecField);
  };

  const onClickPush = async (event) => {
    const cat = lecField;
    cat.push(event.target.name);
    setLecField(cat);
    setCnt(cnt + 1);
    console.log(lecField);
  };

  return (
    <Box component="form" noValidate sx={{ml:1, mt: 1, width:0.7}}>
      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="lecName"
        id="lecName"
        label="Name"
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
      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="lecImg"
        id="lecImg"
        label="Img"
        value={lecImg}
        onChange={onChange}
      />
      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="lecPrice"
        id="lecPrice"
        label="Price"
        value={lecPrice}
        onChange={onChange}
      />
      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="lecUrl"
        id="lecUrl"
        label="Url"
        value={lecUrl}
        onChange={onChange}
      />
      {category_list.map((category, index) =>
        lecField.includes(category) ? (
          <Button
            name={category}
            key={index}
            variant="contained"
            sx={{ m: "10px" }}
            onClick={onClickPop}
          >
            {category}
          </Button>
        ) : (
          <Button
            name={category}
            key={index}
            variant="outlined"
            sx={{ m: "10px" }}
            onClick={onClickPush}
          >
            {category}
          </Button>
        )
      )}
      <Button
        onClick={onSubmit}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default AddLecture;
