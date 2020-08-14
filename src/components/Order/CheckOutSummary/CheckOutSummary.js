import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckOutSummary.css";

const CheckOutSummary = (props) => {
  return (
    <div className={classes.CheckOutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckOutSummary;
