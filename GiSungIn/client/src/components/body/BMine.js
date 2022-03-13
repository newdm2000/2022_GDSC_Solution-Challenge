import { Button, Grid } from "@mui/material";
import LectureCard from "components/body/LectureCard";
import { useParams } from "react-router-dom";


function BMine() {
  const { key } = useParams();
  return (
    (key)?(
    <Grid container sx = {{display : "flex", flexDirection : "row", justifyContent : "center"}}>
      <Grid item>
        <LectureCard lectureId={key} />
      </Grid>
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
