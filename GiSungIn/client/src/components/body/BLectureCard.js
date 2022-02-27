import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbService } from "fbase";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BLectureCard = ({ lectureId }) => {
  const navigate = useNavigate();
  useEffect(() => {
    refresh();
  }, []);
  const [lectureObj, setLectureObj] = useState("");

  const refresh = async () => {
    const lectureQuery = query(
      collection(dbService, "Lectures"),
      where("lid", "==", lectureId)
    );
    const querySnapShot = await getDocs(lectureQuery);
    querySnapShot.forEach((doc) => {
      setLectureObj(doc.data());
    });
  };
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
      {/* <Box onClick = {()=>{console.log({lectureId})}} */}
      <Box
        onClick={() => {
          console.log(lectureId);
          navigate(`/mine/${lectureId}`);
        }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: 1,
          border: "solid",
          height: "100px",
        }}
      >
        <Grid container sx={{ border: "solid", width: 1, height: 1 }}>
          <Grid
            item
            sx={{
              border: "solid blue",
              width: 0.3,
              height: 1,
              backgroundImage: `url(${lectureObj.img_url})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              overflow: "hidden",
            }}
          >
            {/* <img src={lectureObj.img_url} style = {{border : 'solid red', position : 'absolute', width:'auto', height : 'auto', maxHeight : '100%', margin : '0px auto', WebkitTransform : 'translate(50%,50%)', MsTransform : 'translate(50%,50%)',transform : 'translate(50%,50%)'}} alt = 'loading' /> */}
          </Grid>
          <Grid item>
            <h4>{lectureObj.name}</h4>
            {lectureObj.category &&
              lectureObj.category.map((field, index) => (
                <div key={index}>
                  <h5>#{field} </h5>
                </div>
              ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default BLectureCard;
