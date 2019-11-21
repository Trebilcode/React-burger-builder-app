import React, { Component } from 'react';
import { connect } from 'react-redux';




import Button from '../../../Components/UI/Button/Button';
import styles from './ContactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import * as actions from '../../../store/actions/order';
import { updateObject, checkValidity } from '../../../shared/utility';




class ContactData extends Component {
  state = {
    orderForm: {
      
      name: {
        elementType: 'input',
        elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
        },
        value:'',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 10
        },
        valid: false,
        touched: false
      }, 
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
         
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: '',
        validation: {
          required: true,
          maxLength: 5,
          minLength: 3,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
            
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{
            value: 'fastest',
            displayValue: 'Fastest'
          },
          {
            value: 'cheapest',
            displayValue: 'Cheapest'
          }]
        },
        valid: true,
        value:'cheapest',
        validation: {}

      }

    },
    formIsValid: false,
    loading: false

  }

  handleOrder = (event) => {
    event.preventDefault();
      
        const formData = {};
        // eslint-disable-next-line
        for (let formId in this.state.orderForm) {
          formData[formId] = this.state.orderForm[formId].value; 
        }
         const order = {
          ingredients: this.props.ings,
          price: this.props.price,
          orderData: formData,
          userId: this.props.userId
          
      }
      this.props.onOrderBurger(order, this.props.token);
      this.props.history.push('/')
        
  }

  

  handleInputChange = (event, inputId) => {
    
    const updatedFormElement = updateObject(this.state.orderForm[inputId], {
    value: event.target.value,
      valid: checkValidity (event.target.value, this.state.orderForm[inputId].validation),
    touched: true
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {[inputId]: updatedFormElement});

    
    
    let formIsValid = true;
    // eslint-disable-next-line
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    
  }


  render() {

    const formElementsArray = [];
    // eslint-disable-next-line
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }    

    let form = (
      <form onSubmit={this.handleOrder}>
        {formElementsArray.map(formElement =>(
          <Input
          touched={formElement.config.touched}
          shouldValidate={formElement.config.validation}
          invalid={!formElement.config.valid}
          changed={(event) =>this.handleInputChange(event, formElement.id)}
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}/>
        ))}
        <Button disabled={!this.state.formIsValid}  buttonType='Success'>ORDER</Button>




      </form>
    );

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={styles.ContactData}>
        <h4>Please enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
  
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactData);