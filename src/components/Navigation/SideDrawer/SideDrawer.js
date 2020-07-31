import React from "react";
import Logo from "../../Logo/Logo";
import NavifationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../../hoc/Aux";

const SideDrawer = (props) => {
  let sideDrawerClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    sideDrawerClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.open} onClick={props.close} />
      <div className={sideDrawerClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavifationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;