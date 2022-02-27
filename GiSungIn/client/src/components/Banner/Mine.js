import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import BLectureCard from "../body/BLectureCard";
import { dbService } from "fbase";

const Mine = () => {
  useEffect(() => {
    refresh();
  }, []);

  const auth = getAuth();
  const [userObj, setUserObj] = useState("");

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
    console.log(userObj);
  };

  return (
    <> 
      {
        userObj && (
          userObj.lectures.length === 0 ? 
            <h4>탐색을 먼저 해주세요</h4>
          :
          userObj.lectures.map((lid, index) => (
            <div key = {index}>
              <BLectureCard lectureId={lid} />
            </div>
          ))
        )
      }
    </>
  )
}

export default Mine