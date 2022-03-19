import React, { useEffect, useState } from "react";
import { collection, getDoc, query, where, doc, updateDoc, getDocs } from "firebase/firestore";
import { dbService } from "fbase";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "@emotion/styled";
import { grey } from '@mui/material/colors';

const LectureGrid = styled(Grid)({
  background : grey[100],
});

const BLectureCard = ({ lectureId }) => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState("");
  const auth = getAuth();
  useEffect(async () =>{
    const user = auth.currentUser;
    const userQuery = query(
      collection(dbService, "Users"),
      where("uid", "==", user.uid)
    );
    const querySnapShot = await getDocs(userQuery);
    querySnapShot.forEach((doc) => {
      setUserObj(doc.data());
    });
  })
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
    width: "100%",
    background : grey[100],
  };
  const onClickButton = ()=>{
    navigate(`/mine/${lectureId}`);
  }
  const onClickDeleteButton = async (event) => {
    const lec = userObj.lectures;
    for(let i = 0; i<lec.length; i++){
      if(lec[i] === lectureId){
        lec.splice(i,1);
        i--;
      }
    }
    const user = doc(dbService, "Users", auth.currentUser.uid);
    await updateDoc(user, {lectures : lec});
    navigate("/mine");
    
  }
  return (
    <div className="container" style={tempStyle}>
      {/* <Box onClick = {()=>{console.log({lectureId})}} */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          width: 1,
          borderBottom: "solid 1px",
          height: "100px",
          mt : "20px",
        }}
      >
        <Grid container 
          onClick={onClickButton}
        sx={{width: 0.9, height: 1 }}>

          <Box
            component="img"
            sx={{
              height: 1,
              width: 0.3,
            }}
            alt="No Image Exist"
            src={lectureObj.lecImg}
          />
          <Box sx = {{height : 1, width : 0.7}}>
              <Box sx = {{fontSize : "1.0em",height : "50px", m:0}}>{lectureObj.lecName}</Box>
                <Box sx = {{height : "50px"}}>
                  {lectureObj.lecField &&
                    lectureObj.lecField.map((field, index) => (
                    (index<4)?(<Box sx = {{fontSize : "0.5em", display:"inline-block", mr:"5px"}} key = {index}>#{field} </Box>)
                    :((index == 4)? (<Box sx = {{fontSize : "0.5em", display:"inline-block", mr:"5px"}} key = {index}>...</Box>)
                      :(<Box key = {index} xs = {{display : "inline-block"}}></Box>))
                      ))}
                </Box>
          </Box>
        </Grid>
        {(key === lectureId) && <IconButton aria-label="delete" onClick = {onClickDeleteButton} sx = {{display : "flex", alignItems : "center", p:0}}>  
          <DeleteIcon fontSize = "small" />
        </IconButton>
        }
      </Box>
    </div>
  );
};
export default BLectureCard;
