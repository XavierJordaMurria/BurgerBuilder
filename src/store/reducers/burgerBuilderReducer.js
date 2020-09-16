import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1.2,
    bacon: 1,
  };


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionsTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionsTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4, 
                error: false
            };

        case actionsTypes.FETCHED_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            console.log(`[BurgerBuilderReducer] Unrecognized action type: ${action.type}`);
            return state;
    }
};


export default reducer;