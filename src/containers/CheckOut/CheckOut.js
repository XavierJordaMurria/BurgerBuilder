import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    console.log(this.props.location.search);
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    let price = 0;
    console.log(`query: ${query}`);
    for (let param of query.entries()) {
      if( param[0] === 'price') {
        price = +param[1];
      }
      else {
        ingredients[param[0]] = +param[1];
      }
    }
    console.log(`componentDidMount ${JSON.stringify(ingredients)}`);
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>}
        ></Route>
      </div>
    );
  }
}

export default CheckOut;
