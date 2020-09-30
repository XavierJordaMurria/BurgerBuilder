import * as actionTypes from './actionsTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};


export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignedUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3hqdNi-kM_CpQrV8LIluqZCzBC25efrA';

        if (!isSignedUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3hqdNi-kM_CpQrV8LIluqZCzBC25efrA';
        }

        axios.post(url, authData)
        .then( response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(e => {
            console.log(e);
            dispatch(authFail(e));
        });   
    }
}

