import React from 'react';


import styles from './Input.module.css';


const input = (props) => {
  let inputElement = null;
  const InputClasses = [styles.InputElement];

  if(props.invalid && props.shouldValidate && props.touched) {
    InputClasses.push(styles.Invalid)
  }
  switch (props.elementType) {
    
    case ('input'):
      inputElement = <input onChange={props.changed} className={InputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
      break;
    case ('textarea'):
      inputElement = <textarea onChange={props.changed} className={InputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
      break;
    case ('select'):
      inputElement = (
        <select 
        onChange={props.changed}
        className={InputClasses.join(' ')} 
        value={props.value}>
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>
          {option.displayValue}
          </option>
        ))} />
        </select>
        );
      break;
    
    default:
      inputElement = <input onChange={props.changed} className={InputClasses} {...props.elementConfig}value={props.value}/>
  }
  

  return(
    <div className={styles.Input}>
      <label className={styles.Label}>

    {props.label}
      </label>
      {inputElement}
    </div>
  );
}



export default input;