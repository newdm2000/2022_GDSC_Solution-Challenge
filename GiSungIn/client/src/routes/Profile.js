import React from "react";
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        getAuth().signOut();
        navigate("/");
    }
    return (
        <button onClick={onLogOutClick}>Log Out</button>
    )
}
export default Profile;
