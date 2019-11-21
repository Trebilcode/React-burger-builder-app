import React from 'react';
import { connect } from 'react-redux';


import * as actions from '../../store/actions/';
import Aux from '../../hoc/auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuilControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';

import Spinner from '../../Components/UI/Spinner/Spinner';






export class BurgerBuilder extends React.Component {
    
  state = {    
      purchasing: false,
      
    }

    componentDidMount () {
      this.props.onInitIngredients();
    } 
    
    updatePurchaseState (ingredientsObj) {
      const sum = Object.keys(ingredientsObj)
      
      .map(ingredientKey => {  
            
        return ingredientsObj[ingredientKey];        
      })      
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      
      return sum > 0;
      
    }
 
      handlePurchase = () => {

        if(this.props.isAuthenticated) {
          this.setState({ purchasing: true });
        }else {
          this.props.onSetAuthRedirectPath('/checkout');
          this.props.history.push('/auth');
        }
        
      }

      handlePurchaseCancel = () => {
        this.setState({
          purchasing: false
        });
      }

      handleContinuePurchase = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
      

      }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    // eslint-disable-next-line
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    
    let burger = <Spinner />

    if(this.props.ings) {

      orderSummary = <OrderSummary
        price={this.props.price}
        continuePurchase={this.handleContinuePurchase}
        cancelPurchase={this.handlePurchaseCancel}
        ingredients={this.props.ings}
      />

      burger =
       <Aux>
    <Burger ingredients={this.props.ings} />
      <BuildControls
        price={this.props.price}
        disabled={disabledInfo}
        purchasable={!this.updatePurchaseState(this.props.ings)}
        ingredientRemoved={this.props.onIngredientRemoved}
        ingredientAdded={this.props.onIngredientAdded}
        ordered={this.handlePurchase}
        isAuthenticated={this.props.isAuthenticated}
      /> 
      </Aux>
    }

    if (this.state.loading) {
       orderSummary = <Spinner />

    }

    

    return(

      <Aux>

        <Modal 
        modalClosed={this.handlePurchaseCancel}
        show={this.state.purchasing}>
          {orderSummary}
        </Modal>

          {burger}
          
      </Aux>
      
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPatch(path))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps) (BurgerBuilder);