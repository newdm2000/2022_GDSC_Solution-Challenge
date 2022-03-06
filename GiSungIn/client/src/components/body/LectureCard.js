import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, query, where } from "firebase/firestore";
import { dbService } from "fbase";
import { Grid, Link, Paper } from "@mui/material";

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
    <>
      <Grid container>
        <Grid item xs={12}>
          <img src={""} alt={`${lectureObj.lecBrand}`} />
        </Grid>
        <Grid item xs={12}>
          <h2>{lectureObj.lecName}</h2>
        </Grid>
        <Grid item xs={12}>
          <img src={lectureObj.lecImg} />
          <h6>강의 요약 설명...</h6>
        </Grid>
        <Grid item xs={12}>
          <h4>수강기간 : </h4>
          <h4>시간 : </h4>
          <h4>가격 : {lectureObj.lecPrice}</h4>
          <h4>최저가 : </h4>
        </Grid>
        <Grid item xs={12}>
          {lectureObj &&
            lectureObj.lecField.map((lid, index) => (
              <Grid item xs={1}>
                <div key={index}>
                  <Paper
                    xs={{
                      textAlign: "center",
                      color: "theme.pallette.text.primary",
                    }}
                  />
                </div>
              </Grid>
            ))}
        </Grid>
        <Grid item xs={12}>
          <Link to={lectureObj.lecUrl}>링크~</Link>
        </Grid>
      </Grid>
    </>
  );
};
export default LectureCard;
