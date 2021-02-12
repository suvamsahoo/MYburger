import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import "./Logo.css";

const Logo = (props) => {
  return (
    <div className='Logo' style={{height: props.height}}>
      <img src={burgerLogo}></img>
    </div>
  );
};

export default Logo;
