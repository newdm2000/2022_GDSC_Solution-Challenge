import React, { useEffect, useState } from "react";
import { TextField, Box, Button, IconButton } from "@mui/material";
import { addDoc, doc, collection } from "firebase/firestore";
import { dbService, storageService } from "fbase";
import { category_list } from "data";
import { useNavigate } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function AddLecture() {
  const [lectureOrder, setLectureOrder] = useState([]);
  const [aLecture, setALecture] = useState("");
  const [lecBrand, setLecBrand] = useState("");
  //const [lecBrandImg, setLecBrandImg] = useState("");
  const [attachmentBrandImgUrl, setAttachmentBrandImgUrl] = useState("");
  const [lecDescription, setLecDescription] = useState("");
  const [lecName, setLecName] = useState("");
  const [lecTime, setLecTime] = useState("");
  const [lecMethod, setLecMethod] = useState("");
  const [attachmentImgUrl, setAttachmentImgUrl] = useState("");
  const [lecPeriod, setLecPeriod] = useState("");
  const [lecLanguage, setLecLanguage] = useState("");
  const [lecPrice, setLecPrice] = useState(0);
  const [lecField, setLecField] = useState([]);
  const [lecIndex, setLecIndex] = useState([]);
  const [index, setIndex] = useState("");
  const [lecUrl, setLecUrl] = useState("");
  const [num, setNum] = useState(0);
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
    } else if (name === "num") {
      setNum(value);
    } else if (name === "index") {
      setIndex(value);
    } else if (name === "lecUrl") {
      setLecUrl(value);
    } else if (name === "lecPeriod") {
      setLecPeriod(value);
    } else if (name === "lecLanguage") {
      setLecLanguage(value);
    } else if (name === "lecTime") {
      setLecTime(value);
    } else if (name === "lecMethod") {
      setLecMethod(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let lecImg = "";
    if (attachmentImgUrl !== "") {
      const lecImgRef = ref(storageService, `Lectures/lecImg/${lecName}`);
      const responseImg = await uploadString(
        lecImgRef,
        attachmentImgUrl,
        "data_url"
      );
      lecImg = await getDownloadURL(responseImg.ref);
    }
    let lecBrandImg = "";
    if (attachmentBrandImgUrl !== "") {
      const lecBrandImgRef = ref(
        storageService,
        `Lectures/lecBrandImg/${lecBrand}`
      );
      const responseBrandImg = await uploadString(
        lecBrandImgRef,
        attachmentBrandImgUrl,
        "data_url"
      );
      lecBrandImg = await getDownloadURL(responseBrandImg.ref);
    } else {
      lecBrandImg = await getDownloadURL(
        ref(storageService, `Lectures/lecBrandImg/${lecBrand}`)
      );
    }
    await addDoc(collection(dbService, "Lectures"), {
      lecBrand: lecBrand,
      lecBrandImg,
      lecName: lecName,
      lecImg,
      lecUrl: lecUrl,
      lecPrice: lecPrice,
      lecField: lecField,
      lecIndex: lecIndex,
      lecMethod: lecMethod,
      lecLanguage: lecLanguage,
      lecTime: lecTime,
      lecPeriod: lecPeriod,
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
  const onBrandImgChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachmentBrandImgUrl(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onImgChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachmentImgUrl(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearImg = () => {
    setAttachmentImgUrl("");
  };
  const onClearBrandImg = () => {
    setAttachmentBrandImgUrl("");
  };
  const onAddIndex = () => {
    const lindex = lecIndex;
    lindex.push(index);
    setLecIndex(lindex);
    setIndex("");
    setCnt(cnt + 1);
  };

  const onDeleteIndex = () => {
    const lindex = lecIndex;
    lindex.pop();
    setLecIndex(lindex);
    setIndex("");
    setCnt(cnt + 1);
  };

  const AddLec = () => {
    <TextField
      margin="normal"
      type="text"
      required
      fullWidth
      autoFocus
      onChange={setALecture(aLecture)}
    />;
    lectureOrder.push(aLecture);
  };

  return (
    <Box component="form" noValidate sx={{ ml: 1, mt: 1, width: 0.7 }}>
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
      <Button variant="contained">
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onBrandImgChange}
          style={{
            opacity: 0,
          }}
        />
        <label htmlFor="attach-file">
          <span>Brand Img</span>
          <AddRoundedIcon />
        </label>
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          height: "100px",
          weight: "100px",
          color: "#000000",
        }}
      >
        <img
          src={attachmentBrandImgUrl}
          alt="no image"
          style={{
            backgroundImage: "#000000",
            height: "100px",
            weight: "100px",
          }}
        />
        <IconButton onClick={onClearBrandImg}>
          <ClearRoundedIcon />
        </IconButton>
      </Box>
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

      <Button variant="contained">
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onImgChange}
          style={{
            opacity: 0,
          }}
        />
        <label htmlFor="attach-file">
          <span>Lecture Img</span>
          <AddRoundedIcon />
        </label>
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          height: "100px",
          weight: "100px",
          color: "#000000",
          backgroundImage: "#000000",
        }}
      >
        <img
          src={attachmentImgUrl}
          alt="no image"
          style={{
            backgroundImage: "#000000",
            height: "100px",
            weight: "100px",
          }}
        />
        <IconButton onClick={onClearImg}>
          <ClearRoundedIcon />
        </IconButton>
      </Box>
      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="lecPeriod"
        id="lecPeriod"
        label="Period"
        value={lecPeriod}
        onChange={onChange}
      />

      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="lecTime"
        id="lecTime"
        label="Time"
        value={lecTime}
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
        name="lecMethod"
        id="lecMethod"
        label="Method"
        value={lecMethod}
        onChange={onChange}
      />

      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="lecLanguage"
        id="lecLanguage"
        label="Language"
        value={lecLanguage}
        onChange={onChange}
      />

      {lecIndex.map((h, index) => (
        <h3>
          {index + 1}. {h}
        </h3>
      ))}
      <TextField
        margin="normal"
        type="text"
        required
        fullWidth
        autoFocus
        name="index"
        id="index"
        label="Index"
        value={index}
        onChange={onChange}
      />

      <IconButton onClick={onAddIndex}>
        <AddRoundedIcon />
      </IconButton>

      <IconButton onClick={onDeleteIndex}>
        <ClearRoundedIcon />
      </IconButton>

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
            variant="contained"
            color="settings"
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
