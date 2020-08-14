import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";

class CheckOut extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      bacon: 1,
      meat: 1,
    },
  };

  componentDidMount() {
    console.log(this.props.location.search);
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    console.log(`query: ${query}`);
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1]; 
    }
    console.log(`componentDidMount ${JSON.stringify(ingredients)}`);
    this.setState({ingredients: ingredients});
  }

  checkoutCanceledHandler = ()=>{
    this.props.history.goBack();
  }

  checkoutContinuedHandler = ()=>{
    this.props.history.replace('checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default CheckOut;
