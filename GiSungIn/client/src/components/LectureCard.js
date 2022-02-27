import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, query, where } from "firebase/firestore";
import { dbService } from "fbase";

const LectureCard = ({ lectureId }) => {
  useEffect(async () => {
    if (lectureId) {
      const docRef = doc(dbService, "Lectures", lectureId);
      const docSnap = await getDoc(docRef);
      setLectureObj(docSnap.data());
    }
  }, [lectureId]);
  const [lectureObj, setLectureObj] = useState("");

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
      <h4>{lectureObj.lecName}</h4>
    </div>
  );
};
export default LectureCard;
