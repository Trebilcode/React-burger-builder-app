import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../Components/Order/Order';
import * as actions from '../../store/actions/';
import Spinner from '../../Components/UI/Spinner/Spinner';



class Orders extends Component {

  

  componentDidMount () {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders;
    !this.props.loading ? orders = <div>
      {this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price.toFixed(2)} />
      ))}
    </div> : orders = <Spinner/>
    return(
     <div>
        {orders}
     </div> 
    

    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Orders);