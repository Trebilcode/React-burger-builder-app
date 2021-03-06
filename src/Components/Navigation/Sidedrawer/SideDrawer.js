import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/auxiliary/Auxiliary';



const sideDrawer = (props) => {

  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }

  return(

    <Aux>
      <Backdrop 
      clicked={props.closed}
      show={props.open}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
          isAuthenticated={props.isAuthenticated} />
        </nav>


      </div>

    </Aux>

    

  );
}


export default sideDrawer;