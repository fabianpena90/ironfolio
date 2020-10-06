import React from "react";
import "./Footer.css";

function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer>
        <p>Copyright © {year}</p>
      </footer>
    </div>
  );
}

export default Footer;
