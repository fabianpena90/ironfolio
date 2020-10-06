import React from "react";
import "./NavBar.css";
import Avatar from "@material-ui/core/Avatar";
import Container from '@material-ui/core/Container';

const NavBar = () => {
  return (
    <Container maxWidth="xl">
      <div className="navTopBarContainer">
        <div className="logo">
          <h1>Ironfolio</h1>
        </div>
        <div className="profilePic">
          <Avatar src="/broken-image.jpg" />
        </div>
      </div>
    </Container>
  );
};

export default NavBar;
