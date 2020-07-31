import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("[OrderSummary Will Update]");
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (key) => {
        return (
          <li key={key}>
            <span style={{ textTransform: "capitalize" }}>{key}</span>:
            {this.props.ingredients[key]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicius burger with the following ingredients: </p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price:{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancelOrder}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continueOrder}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
