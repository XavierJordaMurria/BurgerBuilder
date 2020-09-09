import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../hoc/AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurguerBuilder extends Component {
  state = {
    purchasing: false,
  };

  updatePurchaseState = (ingredients) => {
    let sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    console.log(`Purchasable: ${sum > 0}`);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
  }

  render() {
    const disabledButtonArr = {
      ...this.props.ing,
    };

    for (const key in disabledButtonArr) {
      disabledButtonArr[key] = disabledButtonArr[key] <= 0;
    }

    let orderSummary = null;

    let burgerObj = this.props.error ? (
      <p>Ingredients can not be loaded!!</p>
    ) : (
        <Spinner></Spinner>
      );
    if (this.props.ing) {
      burgerObj = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledButtonArr}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ing)}
            onOrderClicked={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          cancelOrder={this.purchaseCancelHandler}
          continueOrder={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
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

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: ()=> dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurguerBuilder, axiosInstance));
