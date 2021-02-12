import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = (props) => {
  return (
    <div className="BuildControls">
      <p>
        Current Price: <strong>₹{props.price.toFixed(2)}</strong>
      </p>

      {controls.map((ctr) => (
        <BuildControl
          key={ctr.label}
          Label={ctr.label}
          added={() => props.ingredientAdded(ctr.type)}
          removed={() => props.ingredientRemoved(ctr.type)}
          disabledBTN={props.disabled[ctr.type]}
        />
      ))}

      <button
        className="OrderButton"
        disabled={!props.IsPurchasable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
