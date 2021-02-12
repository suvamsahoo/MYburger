import React from "react";
import "./BuildControl.css";

const BuildControl = (props) => {
  return (
    <div className="BuildControl">
      <div className="Label">{props.Label}</div>
      <button
        className="More"
        onClick={props.added}
      >
        More
      </button>
      <button
        className="Less"
        onClick={props.removed}
        disabled={props.disabledBTN}
      >
        Less
      </button>
    </div>
  );
};

export default BuildControl;
