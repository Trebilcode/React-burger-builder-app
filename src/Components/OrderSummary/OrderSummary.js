import React from 'react';
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button';



class OrderSummary extends React.Component {

    
  
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map(ingredientKey => {
        return <li key={ingredientKey}><span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}</li>
      })
    return(
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          clicked={this.props.cancelPurchase}
          buttonType='Danger'
        >CANCEL
      </Button>
        <Button
          clicked={this.props.continuePurchase}
          buttonType='Success'
        >CONTINUE
      </Button>
      </Aux>
    );
  }
} 

  
  

  




export default OrderSummary;