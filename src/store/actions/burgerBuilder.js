import * as actionTypes from './actionsTypes';
import axiosInstance from "../../hoc/AxiosOrders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return { type: actionTypes.REMOVE_INGREDIENT, ingredientName: name };
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchedIngredientsFailed = ()=> {
    return {
        type: actionTypes.FETCHED_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return dispatch => {
        axiosInstance.get("/ingredients.json")
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((e) => {
                dispatch(fetchedIngredientsFailed());
            });
    };
};
