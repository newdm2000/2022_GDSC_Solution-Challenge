import { Button, Grid } from "@mui/material";
import LectureCard from "components/LectureCard";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authService, dbService } from "fbase";
import {
  collection,
  getDocs,
  doc,
  getFirestore,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

function Bsearch() {
  const leclist = [];
  const [lid, setLid] = useState("");
  const { key } = useParams();
  const navigate = useNavigate();
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

    const lecturesQuery = await getDocs(collection(dbService, "Lectures"));
    await lecturesQuery.forEach((doc) => {
      leclist.push(doc.id);
    });
    const randlec = leclist[parseInt(Math.random() * leclist.length)];
    setLid(randlec);
    console.log(randlec);
  }, []);

  const onclickleft = () => {
    console.log(key);
  };
  const onclickright = async () => {
    const lec = userObj.lectures;
    lec.push(lid);
    const user = doc(dbService, "Users", userObj.uid);
    await updateDoc(user, { lectures: lec });
  };

  const auth = authService;
  const [userObj, setUserObj] = useState("");

  return (
    <Grid container>
      <Grid item>
        <Button onClick={onclickleft}>left</Button>
      </Grid>
      <Grid item>
        <LectureCard lectureId={lid} />
      </Grid>
      <Grid item>
        <Button onClick={onclickright}>right</Button>
      </Grid>
    </Grid>
  );
}

export default Bsearch;
