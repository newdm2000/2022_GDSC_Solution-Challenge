import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navigation = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    getAuth().signOut();
    navigate("/");
  };
  const onLogInClick = () => {
    navigate("/login");
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/lecture">lectures</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {isLoggedIn ? (
          <button onClick={onLogOutClick}>LogOut</button>
        ) : (
          <button onClick={onLogInClick}>LogIn</button>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
