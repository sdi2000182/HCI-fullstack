import React from "react";
import footerpng from "./footerpng.png";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#282828",
    color: "#fff", 
    textAlign: "center",
    position: "relative",
    height: "15vh",
    width: "100%",
  };

  const imageStyle = {
    position:"relative",
    width: "auto", 
    height: "50%",
    marginTop: "30px", 
    marginRight: "10px", 
  };

  return (
    <div>
      <div style={footerStyle}>
        <img src={footerpng} alt="Footer Logo" style={imageStyle} />
      </div>
    </div>
  );
};

export default Footer;
