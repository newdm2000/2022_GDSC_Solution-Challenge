import { Button, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const onClick = (event) => {
    const {
      target: { name },
    } = event;
    if (name === "develop") navigate("/search/develop");
    else if(name ==="bootcamp") navigate("/search/bootcamp");
    else if(name ==="recruit") navigate("/search/recruit");
  };
  return (
    <Box>
      <Button name="develop" onClick={onClick}>
        개발 강의 탐색
      </Button>
      <Button name="bootcamp" onClick={onClick}>
        부트 캠프 탐색
      </Button>
      <Button name="recruit" onClick={onClick}>
        채용 정보 탐색
      </Button>
    </Box>
  );
}

export default Search;
