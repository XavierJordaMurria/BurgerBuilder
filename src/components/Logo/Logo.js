import React from "react";
import burgerLog from "../../assets/images/burger-logo.png";
import classes from './Logo.css';

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLog} alt="MyBurguer"/>
    </div>
  );
};

export default Logo;
