import React from "react";
import "./NavBar.css";
import Avatar from "@material-ui/core/Avatar";

const NavBar = () => {
  return (
    <div>
      <div className="navTopBarContainer">
        <div className="logo">
          <h1>Ironfolio</h1>
        </div>
        <div className="profilePic">
          <Avatar src="/broken-image.jpg" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
