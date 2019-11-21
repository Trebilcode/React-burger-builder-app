import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';


import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import styles from './Auth.module.css';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/';
import { updateObject, checkValidity } from '../../shared/utility';



class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
    },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      
    },
    isSignUp: true
  }

  componentDidMount () {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
  }

  handleInputChange = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, { 
      [controlName]: updateObject(this.state.controls[controlName], { 
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
        
      
    }) 
      
      
    
    this.setState({controls: updatedControls})
  }

  switchButtonSignInSignUp = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    })
  }


  render() {
 


    const formElementsArray = [];
    // eslint-disable-next-line
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

     let form = formElementsArray.map(formElement => {
      return <Input
      key={formElement.id}
      touched={formElement.config.touched}
      shouldValidate={formElement.config.validation}
      invalid={!formElement.config.valid}
      changed={(event) => this.handleInputChange(event, formElement.id)}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      />
    })

    if(this.props.loading) {
      form = <Spinner/>
    }

    let errorMessage = null;

    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }
    let authRedirect = null;
    if(this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={styles.Auth}>
      {authRedirect}
      {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button buttonType='Success'>SUBMIT</Button>


        </form>

          <Button clicked={this.switchButtonSignInSignUp} buttonType='Danger'>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>

      </div>
    );
  }
}


 const mapDispatchToProps = dispatch => {
   return {
     onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
     onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPatch('/'))
   }
 }

 const mapStateToProps = state => {
   return {
     loading: state.auth.loading,
     error: state.auth.error,
     isAuthenticated: state.auth.token !== null,
     buildingBurger: state.burgerBuilder.building,
     authRedirectPath: state.auth.authRedirectPath
   }
 }


export default connect(mapStateToProps, mapDispatchToProps) (Auth);