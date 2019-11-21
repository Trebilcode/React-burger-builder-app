import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';



import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import './App.css';
import Logout from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./Containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./Containers/Orders/Orders');
});


const asyncAuth = asyncComponent(() => {
  return import('./Containers/Auth/Auth');
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }



  render() {
    let routes = (
      <div>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' exact component={asyncAuth} />
        <Redirect to='/' />
      </div>
      
    )

    if (this.props.isAuthenticated) {
      routes = (
        <div>
          <Switch>
        
            <Route  path='/checkout' component={asyncCheckout} />

            <Route path='/orders'  component={asyncOrders} />

            <Route path='/logout'  component={Logout} />
            <Route path='/auth'  component={asyncAuth} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
          
          </Switch>
        
        </div>

      )
    }
    return (
      <div>
        <Layout>
          {routes}




        </Layout>
      </div>
    );
  }
  
  
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState())
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
