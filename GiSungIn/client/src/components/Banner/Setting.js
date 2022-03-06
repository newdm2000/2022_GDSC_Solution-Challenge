import React, { useEffect, useState, componentDidMount } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import BLectureCard from "./BLectureCard";
import { dbService } from "fbase";
import { Button, Grid } from "@mui/material";
import { async } from "@firebase/util";

const category_list = [
  "JavaScipt",
  "C++",
  "SQL",
  "Python",
  "React-Native",
  "Vue.js",
  "React",
  "R",
  "Pytorch",
  "Keras",
  "Tensorflow",
];

function Setting() {
  const auth = getAuth();
  const [userObjCategory, setUserObjCategory] = useState([]);
  const [Cnt, setCnt] = useState(0);
  const user = auth.currentUser;
  useEffect(async () => {
    const docRef = doc(dbService, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    setUserObjCategory(docSnap.data().category);
  }, [Cnt]);

  const onClickPop = async (event) => {
    const cat = userObjCategory;
    for (let i = 0; i < cat.length; i++) {
      if (cat[i] === event.target.name) {
        cat.splice(i, 1);
        i--;
      }
    }
    const user_ = doc(dbService, "Users", user.uid);
    await updateDoc(user_, { category: cat });
    setUserObjCategory(cat);
    setCnt(Cnt + 1);
  };

  const onClickPush = async (event) => {
    const cat = userObjCategory;
    cat.push(event.target.name);
    const user_ = doc(dbService, "Users", user.uid);
    await updateDoc(user_, { category: cat });
    setUserObjCategory(cat);
    setCnt(Cnt + 1);
  };

  return category_list.map((category, index) =>
    userObjCategory.includes(category) ? (
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
  );
}

export default Setting;
