import * as actionsTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true });
        case actionsTypes.AUTH_SUCCESS:
            return updateObject(state, { token: action.idToken, userID: action.userId, error: null, loading: false });
        case actionsTypes.AUTH_FAIL:
            return updateObject(state, { error: action.error, loading: false });
        case actionsTypes.AUTH_LOGOUT:
            return updateObject(state, { token: null, userID: null, error: null, loading: false });
        default:
            console.log(`[AuthReducer] Unrecognized action type: ${action.type}`);
            return state;
    }
};


export default reducer;