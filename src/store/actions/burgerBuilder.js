import axios from '../../axios-orders';       

import * as actionTypes from './actionTypes';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
}

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FECTH_INGREDIENTS_FAILED
  }
}

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}



export const initIngredients = () => {
  return dispatch => {
    axios.get('https://burger-react-9a2de.firebaseio.com/ingredients.json')
      .then (response => {
        dispatch(setIngredients(response.data));
    })
      .catch (error => {
        dispatch(fetchIngredientsFailed());
    });
  }
}
