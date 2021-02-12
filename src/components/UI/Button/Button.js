import React from "react";
import './Button.css'

const Button = (props) => {
  return (
    <>
      <button disabled={props.disabled} onClick={props.clicked} className={["Button", props.btnType].join(' ')}>{props.children}</button>
    </>
  );
};

export default Button;
