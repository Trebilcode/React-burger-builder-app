import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])]  
    .map((_, index) => {
        return  <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
        
      })
       
    }) 
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

    if(transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>
    }
  return(

    <div className={styles.Burger}>
      <BurgerIngredient  type='bread-top'/>
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>

  );
}


export default burger;