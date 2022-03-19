import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import BLectureCard from "./BLectureCard";
import { dbService } from "fbase";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";


const Mine = () => {
  let { key } = useParams();
  const auth = getAuth();
  const [userObj, setUserObj] = useState("");
  useEffect(async() => {
    refresh();
  }, [userObj.lectures,key]);

  const refresh = async () => {
    const user = auth.currentUser;
    const userQuery = query(
      collection(dbService, "Users"),
      where("uid", "==", user.uid)
    );
    const querySnapShot = await getDocs(userQuery);
    querySnapShot.forEach((doc) => {
      setUserObj(doc.data());
    });
  };

  return (
    <> 
      {
        userObj && (
          userObj.lectures.length === 0 ? 
            <h4>탐색을 먼저 해주세요</h4>
          :
          userObj.lectures.map((lid, index) => (
            <Grid key = {index}>
              <BLectureCard lectureId={lid} />
            </Grid>
          ))
        )
      }
    </>
  )
}

export default Mine