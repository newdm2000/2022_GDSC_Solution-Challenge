import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "fbase";
import { Box, Grid, Link } from "@mui/material";
import { getAuth } from "firebase/auth";

const LectureCard = ({ lectureId }) => {
  const auth = getAuth();
  useEffect(async () => {
    if (lectureId) {
      const docRef = doc(dbService, "Lectures", lectureId);
      const docSnap = await getDoc(docRef);
      setLectureObj(docSnap.data());
    }
  }, [lectureId]);
  const [userObj, setUserObj] = useState("");
  const [lectureObj, setLectureObj] = useState("");
  return (
    <>
      <Grid container sx = {{border : "solid 1px", display : "flex", alighContent:"flex-start" ,width : "450px", p : "20px", height : "0.9"}}>
        <Grid item sx = {{height : 0.55}}>
          <Grid item xs={12}>
            <img src={""} alt={`${lectureObj.lecBrand}`} />
          </Grid>
          <Grid item xs={12}  sx = {{textAlign:"center"}}>
            <h2>{lectureObj.lecName}</h2>
          </Grid>
          <Grid item xs={12}>
            <img src={lectureObj.lecImg} />
            <h6>강의 요약 설명...</h6>
          </Grid>
        </Grid>
        <Grid item xs={12} sx = {{height : 0.3}}>
          <h5>수강기간 : </h5>
          <h5>시간 : </h5>
          <h5>가격 : {lectureObj.lecPrice}</h5>
          <h5>최저가 : </h5>
        </Grid>
        <Grid item sx = {{height : 0.15}}>
          <Grid item xs={12} display="flex"
                      alignItems="flex-start"
                      flexDirection="row"
                      flexWrap = "wrap">
            {lectureObj &&
              lectureObj.lecField.map((lid, index) => (
                <Grid item key = {index}>
                    <Box
                      sx={{
                        border : "solid 1px",
                        borderRadius : "5px",
                        mr : "5px",
                        p : "2px",
                      }}
                      >
                        {lid}
                    </Box>
                </Grid>
              ))}
          </Grid>
          <Grid item xs={12}>
            <Link to={lectureObj.lecUrl}>링크~</Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default LectureCard;
