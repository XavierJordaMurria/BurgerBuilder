import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:
        {props.ingredients[key]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicius burger with the following ingredients: </p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price:{props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.cancelOrder}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continueOrder}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
