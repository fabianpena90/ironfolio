import React from "react";
import "./Footer.css";

function Footer(props) {
  const year = new Date().getFullYear();
  return <footer>Copyright © {year}</footer>;
}

export default Footer;
