import React from "react";
import AddLecture from "./AddLecture";

function Admin({ isAdmin }) {

    
  if (isAdmin) {
    return <AddLecture />;
  } else {
    return <div></div>;
  }
}

export default Admin;
