import React from "react";
import "./Footer.css";


function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer>
        <p>Happy Coding ♥️ </p>
      </footer>
    </div>
  );
}

export default Footer;