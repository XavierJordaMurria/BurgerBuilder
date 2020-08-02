import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../hoc/AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.2,
  bacon: 1,
};

class BurguerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchaseState = (ingredients) => {
    let sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    console.log(`Purchasable: ${sum > 0}`);
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
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
        this.setState({ loading: false, purchasing: false });
      })
      .catch((e) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  componentDidMount() {
    axiosInstance.get("/ingredients.json").then((response) => {
      this.setState({
        ingredients: response.data,
        error: false
      })})
      .catch((e) => {
        this.setState({ error: true });
        console.error(`[BurgerBuilder] Error fetching ingredients e: ${e}`);
      });
  }

  render() {
    const disabledButtonArr = {
      ...this.state.ingredients,
    };

    for (const key in disabledButtonArr) {
      disabledButtonArr[key] = disabledButtonArr[key] <= 0;
    }

    let orderSummary = null;

    let burgerObj = this.state.error ? (
      <p>Ingredients can not be loaded!!</p>
    ) : (
      <Spinner></Spinner>
    );
    if (this.state.ingredients) {
      burgerObj = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelOrder={this.purchaseCancelHandler}
          continueOrder={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burgerObj}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurguerBuilder, axiosInstance);
