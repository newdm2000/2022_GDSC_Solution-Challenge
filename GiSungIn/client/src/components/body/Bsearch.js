import { Button, Grid } from "@mui/material";
import LectureCard from "components/body/LectureCard";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authService, dbService } from "fbase";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ReportGmailerrorredTwoToneIcon from '@mui/icons-material/ReportGmailerrorredTwoTone';import {
  collection,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

function Bsearch() {
  let leclist = [];
  const [lid, setLid] = useState();
  const auth = authService;
  const [userLec, setUserLec] = useState([]);
  const [num,setNum]= useState(-1);
  const [trashCan, setTrashCan] = useState([]);

  useEffect(async () => {
    let dummy = [];
    const user = auth.currentUser;
    const userQuery = query(
      collection(dbService, "Users"),
      where("uid", "==", user.uid)
    );
    const querySnapShot = await getDocs(userQuery);
    querySnapShot.forEach((doc) => {
      setUserLec(doc.data().lectures);
      dummy = doc.data().lectures;
    });
    setNum(dummy.length);
  }, []);

  useEffect(async ()=>{
    const lecturesQuery = await getDocs(collection(dbService, "Lectures"));
    if(num > -1){
      lecturesQuery.forEach((doc) => {
        if(!userLec.includes(doc.id) && !trashCan.includes(doc.id)){
          leclist.push(doc.id);
        }
      });
      const randlec = leclist[parseInt(Math.random() * leclist.length)];
      setLid(randlec);
    }
  },[num])

  const onclickleft = () => { 
    const lec = trashCan;  
    lec.push(lid);
    setNum(num + 1);
    setTrashCan(lec);
  };
  const onclickright = async (lid, e) => {
    const lec = userLec;
    if(!lec.includes(lid)){
      lec.push(lid);
      setNum(num + 1);
    }
    await updateDoc(doc(dbService, "Users", auth.currentUser.uid), { lectures: lec });
  };


  return (
    <>
    {
    (num > -1 && !lid) ? 
    <>
      <ReportGmailerrorredTwoToneIcon fontSize = "large"/>
      <h4>You've Searched All Lectures that we Prepared. Please Refresh Page!</h4>
      <ReportGmailerrorredTwoToneIcon fontSize = "large"/>
    </>
    : (
        <Grid container sx = {{height : 1, display : "flex", flexDirection : "row", justifyContent : "space-evenly", alignItems : "center"}}>
        <Grid item>
          <Button variant="contained" onClick={onclickleft} >
            <ClearRoundedIcon />
          </Button>
        </Grid>
        <Grid item sx = {{display : "flex", alignItems : "center",  height : 1}}>
          {lid && <LectureCard lectureId={lid} />}
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={(e) => onclickright(lid,e)}>
            <CheckRoundedIcon />
          </Button>
        </Grid>
      </Grid>
      )
    }
    </>
  );
}

export default Bsearch;
