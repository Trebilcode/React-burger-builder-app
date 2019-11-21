import React from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends React.Component {

  state = {
    showSideDrawer: false
  }

  handleSideDrawerClosed = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  handleSideDrawerToggle = () => {
    this.setState(prevState => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    return(
      <Aux>
        <Toolbar 
        isAuthenticated={this.props.isAuthenticated}
        drawerToggleClicked={this.handleSideDrawerToggle}/>
        <SideDrawer 
        isAuthenticated={this.props.isAuthenticated}
        open={this.state.showSideDrawer}
        closed={this.handleSideDrawerClosed} />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
  
}

export default connect(mapStateToProps) (Layout);