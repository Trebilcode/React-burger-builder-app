import React from 'react';

import Burger from '../../Components/Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.module.css';



const checkoutSummary = (props) => {
  return(
    <div className={styles.CheckoutSummary}>
      <h1>Delicious hamburger</h1>
      <div style={{width: '100%', margin: 'auto'}}>
      <Burger ingredients={props.ingredients}/>
      </div>
      <Button 
      clicked={props.cancelCheckout}
      buttonType={'Danger'}>
      CANCEL
      </Button>
      <Button
      clicked={props.continueCheckout}
      buttonType={'Success'}>
      CONTINUE
      </Button>

    </div>
  );
}

export default checkoutSummary;