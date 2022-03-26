import { Button, Grid } from "@mui/material";
import LectureCard from "components/body/LectureCard";
import { dbService } from "fbase";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


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
        <img src = "https://cdn-icons.flaticon.com/png/512/1481/premium/1481058.png?token=exp=1648287862~hmac=a2f3224e43c0955c30a8471fa55e8a6c" width = {100} height = {100}/>
      </Grid>
        :
      <Grid container sx = {{display : "flex", flexDirection : "row", justifyContent : "center"}}>
        <img src = "https://cdn-icons-png.flaticon.com/512/545/545680.png" width = {150} height = {150}/>
        <h1>
          <p></p>
          Please Click the Lecture on the banner!
        </h1>
      </Grid>
    )
  );
}

export default BMine;
