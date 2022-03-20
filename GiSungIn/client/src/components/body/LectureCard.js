import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "fbase";
import { Box, Grid, Link, Typography } from "@mui/material";
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
      <BLectureGrid container sx = {{border : "solid 1px", display : "flex", alignContent:"center" ,width : "450px", p : "20px", height : "0.7"}}>
        <Grid item sx = {{height : 0.55}}>
          <Box item xs={12} sx = {{display : "flex",
            justifyContent: "flex-start",
            height : "25px",
            weight : "25px",
            color : "#000000",}}>
            <img src={lectureObj.lecBrandImg} alt={`${lectureObj.lecBrand}`} />
            {lectureObj.lecBrand}
          </Box>
          <Grid item xs={12}  sx = {{textAlign:"center", display:"flex"}}>
            <h2>{lectureObj.lecName}</h2>
          </Grid>
          <Box sx = {{display : "flex", width:"400px", justifyContent: 'center', ml:"10px"}}>
          <Box sx = {{display : "flex",
            justifyContent: "flex-start",
            width : "200px",
            color : "#000000",}}>
            <img src={lectureObj.lecImg} width="200px"/>
          </Box>
          <Box sx = {{justifyContent: "flex-start",
            width : "150px",
            color : "#000000",
            ml:"20px"}}>
          <Typography variant="body2" sx={{mb:"3px", fontSize:"12px"}}>수강 기간 : {lectureObj.lecPeriod}</Typography>
          <Typography variant="body2" sx={{mb:"3px", fontSize:"12px"}}>학습 시간 : {lectureObj.lecTime}</Typography>
          <Typography variant="body2" sx={{mb:"3px", fontSize:"12px"}}>가격 : {lectureObj.lecPrice}원</Typography>
          <Typography variant="body2" sx={{mb:"3px", fontSize:"12px"}}>강의 언어 : {lectureObj.lecLanguage}</Typography>
          </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sx = {{height : 0.3, ml:"10px"}}>
          <Typography variant="body1">강의 목차</Typography>
          {lectureObj && lectureObj.lecIndex.map((lid, index) => (<Typography variant="body2" key = {index}>
            {index+1}. {lid}
          </Typography>))}
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
          <Grid item sx={{mt:"5px"}}>
            <Link href={lectureObj.lecUrl}>링크~</Link>
          </Grid>
        </Grid>
      </BLectureGrid>
    </>
  );
};
export default LectureCard;
