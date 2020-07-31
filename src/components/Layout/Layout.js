import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";
import ToolBar from "../Navigation/ToolBar/ToolBar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sideDrawerClosedHandler = () => {
    console.log('Closing sideDrawing');
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <Aux>
        <ToolBar />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.sideDrawerClosedHandler}
        ></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
