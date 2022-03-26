import { Button, Grid } from "@mui/material";
import LectureCard from "components/body/LectureCard";
import { dbService } from "fbase";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import WestTwoToneIcon from '@mui/icons-material/WestTwoTone';

function BMine() {
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
  const onClickButton = async (event) => {
    const lec = userObj.lectures;
    for(let i = 0; i<lec.length; i++){
      if(lec[i] === key){
        lec.splice(i,1);
        i--;
      }
    }
    const user = doc(dbService, "Users", auth.currentUser.uid);
    await updateDoc(user, {lectures : lec});
    navigate("/mine");
  }
  return (
    (key)?(
    <Grid container 
    sx = {{height : 1, display : "flex", justifyContent : "center", alignItems : "center",}}>
      <Grid item sx = {{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center",  height : 1}}>
        <LectureCard lectureId={key} />
        <Grid item sx = {{width : 1, display : "flex", justifyContent: "flex-end"}}>
          <Button variant="contained" onClick = {onClickButton}>
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
    )
    :
    (
      userObj && userObj.lectures.length === 0 ? 
        <Grid container sx = {{display : "flex", flexDirection : "row", justifyContent : "center"}}>
        <h1>
          Please Search the Lectures on the "Search" Menu!
        </h1>
        <p><TouchAppOutlinedIcon fontSize = "large" /></p>
      </Grid>
        :
      <Grid container sx = {{display : "flex", flexDirection : "row", justifyContent : "center"}}>
        <p><WestTwoToneIcon fontSize = "large" /></p>
        <h1>
          　Please Click the Lecture on the banner!
        </h1>
      </Grid>
    )
  );
}

export default BMine;
