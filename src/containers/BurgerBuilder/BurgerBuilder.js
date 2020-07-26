import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.2,
  bacon: 1,
};

class BurguerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState = (ingredients) => {
    let sum =  Object.keys(ingredients)
        .map((key) => ingredients[key])
        .reduce((sum, el) => sum + el, 0);

    console.log(`Purchasable: ${sum>0}`);
    this.setState({ purchasable: sum > 0 });
  };
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;
    const roundedPrice =
      Math.round((updatedPrice + Number.EPSILON) * 100) / 100;
    this.setState({
      totalPrice: roundedPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeduction;
    const roundedPrice =
      Math.round((updatedPrice + Number.EPSILON) * 100) / 100;
    this.setState({
      totalPrice: roundedPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  render() {
    const disabledButtonArr = {
      ...this.state.ingredients,
    };

    for (const key in disabledButtonArr) {
      disabledButtonArr[key] = disabledButtonArr[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledButtonArr}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          onOrderClicked={this.purchaseHandler}
        ></BuildControls>
      </Aux>
    );
  }
}

export default BurguerBuilder;
