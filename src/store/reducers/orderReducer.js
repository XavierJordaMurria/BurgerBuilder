import * as actionsTypes from '../actions/actionsTypes';


const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false

            };
        case actionsTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true

            };
        case actionsTypes.PURCHASE_BURGUER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)

            };
        case actionsTypes.PURCHASE_BURGUER_FAIL:
            return {
                ...state,
                loading: false

            };
        case actionsTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionsTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }

        case actionsTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            console.log(`[Orders] Unrecognized action type: ${action.type}`);
            return state;
    }
};


export default reducer;