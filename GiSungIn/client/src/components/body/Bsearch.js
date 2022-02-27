import { Grid } from "@mui/material";
import LectureCard from "components/LectureCard";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authService, dbService } from "fbase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

function Bsearch() {
  const leclist = [];
  const { key } = useParams();
  useEffect(async () => {
    const user = auth.currentUser;
    const userQuery = query(
      collection(dbService, "Users"),
      where("uid", "==", user.uid)
    );
    const querySnapShot = await getDocs(userQuery);
    querySnapShot.forEach((doc) => {
      setUserObj(doc.data());
    });
    console.log(userObj);

    const lecturesQuery = await getDocs(collection(dbService, "Lectures"));
    lecturesQuery.forEach((doc) => {
      leclist.push(doc.id);
    });
    
  }, []);

  const auth = authService;
  const [userObj, setUserObj] = useState("");

  return (
    <Grid container>
      <Grid item></Grid>
      <Grid item></Grid>
      <Grid item></Grid>
    </Grid>
  );
}

export default Bsearch;
