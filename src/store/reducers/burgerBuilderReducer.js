import * as actionsTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

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

const operateIngredient = (state, action, fn) => {
    const updatedIngredient = { [action.ingredientName]: fn(state.ingredients[action.ingredientName], 1) };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const newState = {
        ingredients: updatedIngredients,
        totalPrice: fn(state.totalPrice, INGREDIENTS_PRICES[action.ingredientName])
    };
    return updateObject(state, newState);
}

const addIngredient = (state, action) => {
    return operateIngredient(state, action, (a, b)=> a + b);
}

const removeIngredient = (state, action) => {
    return operateIngredient(state, action, (a, b)=> a - b);
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionsTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
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