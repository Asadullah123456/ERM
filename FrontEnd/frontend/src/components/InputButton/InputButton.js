import React from 'react';
import './InputButton.css';

const InputButton = (props) => {
  return (
    <div className='formGroup'>
        <input type='submit' name={props.name} id={props.id} value={props.value} className='form-submit' />
    </div>
  );
};

export default InputButton;
