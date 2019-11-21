import axios from 'axios';

import * as actionTypes from './actionTypes';


export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');


  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())      
    }, expirationTime * 1000);

  }
}




export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData, idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
    idToken,
    userId
  }
} 

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8X-XkPjTUE-DH54O9IvXGwDs3777eLHw';

    if(!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8X-XkPjTUE-DH54O9IvXGwDs3777eLHw' 
    }

    axios.post(url, authData)
    .then(response => {
      console.log(response);
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userId', response.data.localId )

      dispatch(authSuccess(authData,response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error.response.data.error));
    })
  }
}

export const setAuthRedirectPatch = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
       const expirationDate = new Date(localStorage.getItem('expirationDate'));
       if(expirationDate <= new Date()) {
         dispatch(logout());
       }else{
         
         const userId = localStorage.getItem('userId');
         dispatch(authSuccess(null, token, userId));
         dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000));
       }
    }

  }
}