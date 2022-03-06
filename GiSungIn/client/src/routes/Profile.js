import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import LectureCard from "components/body/LectureCard";

const Profile = () => {
  useEffect(() => {
    refresh();
  }, []);
  const auth = authService;
  const [userObj, setUserObj] = useState("");
  const navigate = useNavigate();
  const onLogOutClick = () => {
    getAuth().signOut();
    navigate("/");
  };

  const refresh = async () => {
    const dbService = getFirestore();
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
      <h4>user name : {userObj.name}</h4>
      <h4>user email : {userObj.email}</h4>
      <h4>user age : {userObj.age}</h4>
      <h4>lectures</h4>
      <h4>{userObj.lectures}</h4>
      {userObj &&
        userObj.lectures.map((lecture, index) => (
          <div key={index}>
            <LectureCard lectureId={lecture} />
          </div>
        ))}
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
