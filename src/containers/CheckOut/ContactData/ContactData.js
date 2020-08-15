import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axiosInstance from "../../../hoc/AxiosOrders";

class ContactData extends Component {
  state = {
    name: "",
    emial: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState( { loading: true } );

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Mr. X",
        address: { stret: "LL", zipCode: "1234123", country: "Sp" },
        email: "test@test.com",
      },
      deliveryMethod: "fast",
    };
    axiosInstance
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
      })
      .catch((e) => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data here.</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your name"
          ></input>
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your email"
          ></input>
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street Address"
          ></input>
          <input
            className={classes.Input}
            type="text"
            name="postalcode"
            placeholder="PostalCode Address"
          ></input>
          <Button btnType="Success" onClick={this.orderHandler}>
            Order
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
