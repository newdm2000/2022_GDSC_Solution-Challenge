import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "fbase";
import { Box, Grid, Link } from "@mui/material";
import { getAuth } from "firebase/auth";
import styled from "@emotion/styled";
import { grey } from '@mui/material/colors';
const BLectureGrid = styled(Grid)({
  background : grey[100],
});
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
      <BLectureGrid container sx = {{border : "solid 1px", display : "flex", alighContent:"flex-start" ,width : "450px", p : "20px", height : "0.9"}}>
        <Grid item sx = {{height : 0.55}}>
          <Box item xs={12} sx = {{display : "flex",
            justifyContent: "flex-start",
            height : "20px",
            weight : "20px",
            color : "#000000",}}>
            <img src={lectureObj.lecBrandImg} alt={`${lectureObj.lecBrand}`} />
            {lectureObj.lecBrand}
          </Box>
          <Grid item xs={12}  sx = {{textAlign:"center"}}>
            <h2>{lectureObj.lecName}</h2>
          </Grid>
          <Box sx = {{display : "flex",
            justifyContent: "flex-start",
            height : "100px",
            weight : "100px",
            color : "#000000",}}>
            <img src={lectureObj.lecImg} />
            <h6>강의 요약 설명...</h6>
          </Box>
        </Grid>
        <Grid item xs={12} sx = {{height : 0.3}}>
          <h5>수강기간 : </h5>
          <h5>시간 : </h5>
          <h5>가격 : {lectureObj.lecPrice} 원</h5>
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
            <Link href={lectureObj.lecUrl}>링크~</Link>
          </Grid>
        </Grid>
      </BLectureGrid>
    </>
  );
};
export default LectureCard;
