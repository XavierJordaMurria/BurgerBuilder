import React from "react"; // imr
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  // slr
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{props.price.toFixed(2)}€</strong>
      </p>
      {controls.map((c) => (
        <BuildControl
          key={c.label}
          label={c.label}
          added={() => props.ingredientAdded(c.type)}
          removed={() => props.ingredientRemoved(c.type)}
          disabled={props.disabled[c.type]}
        ></BuildControl>
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.onOrderClicked}
      >
        {props.isAuth ? "Order Now!" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
