import React from 'react';
import {Link} from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";


function Header(props) {
  return (
      <div className="navTopBarContainer">
        <div className="logo">
          <a className="navBarLinkLogo" href="./profile">
            <h1>Ironfolio</h1>
          </a>
        </div>
        <div className="profilePic">
          <Avatar src="/broken-image.jpg" />
        </div>
      </div>
  );
}

export default Header;