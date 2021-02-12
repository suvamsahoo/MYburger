import React, { Component } from "react";
import Aux from "../../../hoc/Auxx";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate(){
    console.log("order updated!!");
  }
  render() {
    const IngredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>-:
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order-:</h3>
        <p>A delicious burger with the following ingredients-: </p>
        <ul>{IngredientSummary}</ul>
        <p>
          <strong>Total Price: ₹{this.props.TP.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCancled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
