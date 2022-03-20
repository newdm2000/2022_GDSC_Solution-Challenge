import { Grid, Box } from "@mui/material";
const Home = () => {
  return (
    <Grid container 
    sx = {{height : 1, display : "flex", justifyContent : "center", alignItems : "center",}}>
      <Grid container sx = {{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
        <Box><h1>
          배너에서 항목을 눌러주세요.
        </h1>
        <p>Search : Find lectures</p>
        <p>Mine : Can see my lectures that had already selected</p>
        <p>Settings : Setting my interests</p></Box>
      </Grid>
    </Grid>
  );
};

export default Home;
