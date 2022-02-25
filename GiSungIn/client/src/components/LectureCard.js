import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const LectureCard = ({ lectureId }) => {
  useEffect(() => {
    refresh();
  }, []);
  const [lectureObj, setLectureObj] = useState("");

  const refresh = async () => {
    const dbService = getFirestore();
    const lectureQuery = query(
      collection(dbService, "Lectures"),
      where("lid", "==", lectureId)
    );
    const querySnapShot = await getDocs(lectureQuery);
    querySnapShot.forEach((doc) => {
      setLectureObj(doc.data());
    });
  };
  const tempStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    position: "relative",
    marginBottom: "20px",
    width: "100%",
  };
  return (
    <div className="container" style={tempStyle}>
      <img src={lectureObj.img_url} />
      <h4>{lectureObj.name}</h4>
    </div>
  );
};
export default LectureCard;
