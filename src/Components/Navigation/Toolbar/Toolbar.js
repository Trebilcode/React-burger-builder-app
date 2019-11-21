import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../../Components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
  return(
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked}/>
      <div className={styles.Logo}>
        <Logo />
      </div>
      
      <nav className={styles.DesktopOnly}>
        <NavigationItems
        isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
}




export default toolbar;