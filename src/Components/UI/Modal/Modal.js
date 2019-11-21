import React from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = React.memo((props) => {
  return(
    <Aux>
      <Backdrop 
      clicked={props.modalClosed}
      show={props.show}
      />
      <div
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }} 
      className={styles.Modal}>
        {props.children}
      </div>
    </Aux>
  );
}, (prevProps, nextProps) => nextProps.show === prevProps.show || prevProps.children === nextProps.children )





export default modal;