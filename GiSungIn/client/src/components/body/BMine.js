import { Button, Grid } from "@mui/material";
import LectureCard from "components/body/LectureCard";
import { useParams } from "react-router-dom";


function BMine() {
  const { key } = useParams();
  return (
    <Grid container>
      <Grid item>
        <LectureCard lectureId={key} />
      </Grid>
    </Grid>
  );
}

export default BMine;
