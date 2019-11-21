import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';




class Checkout extends Component {

        handleContinueCheckout = () => {
      this.props.history.replace('/checkout/contact-data');
    }

    handleCancelCheckout = () => {
      this.props.history.goBack();
    }


render () {
  let summary = <Redirect to='/'/>
  if (this.props.ings) {
    
    summary = <div>
      
      <CheckoutSummary
        cancelCheckout={this.handleCancelCheckout}
        continueCheckout={this.handleContinueCheckout}

        ingredients={this.props.ings}
      />
      <Route
        path={this.props.match.path + '/contact-data'} component={ContactData} />
    </div>

  } 
  return summary;
}
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}



export default connect( mapStateToProps )( Checkout ); 