import { Button, Grid } from "@mui/material";
import LectureCard from "components/body/LectureCard";
import { dbService } from "fbase";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
    <Grid container sx = {{display : "flex", flexDirection : "row", justifyContent : "center"}}>
      <Grid item>
        <LectureCard lectureId={key} />
      </Grid>
      <Button onClick = {onClickButton} sx = {{alignItems : "flex-end", }}>
            X
      </Button>
    </Grid>
    )
    :
    (
      <Grid container sx = {{display : "flex", flexDirection : "row", justifyContent : "center"}}>
        <h1>
          배너에서 항목을 눌러주세요.
        </h1>
      </Grid>
    )
  );
}

export default BMine;
