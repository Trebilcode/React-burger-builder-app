import React from 'react';
import styles from './Order.module.css';


const order = (props) => {

  const ingredients = [];
// eslint-disable-next-line
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName, 
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ingredient => {
    return <span 
      style={{
      textTransform: 'capitalize', 
      display: 'inline-block',
      margin: '0 8px',
      padding: '5px',
      border: '1px solid #ccc' 
      
      }}
      key={ingredient.name}>
      {ingredient.name} ({ingredient.amount}) 
      </span>
  });

  return(
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {props.price}</strong></p>

    </div>
  );
    
}

export default order;