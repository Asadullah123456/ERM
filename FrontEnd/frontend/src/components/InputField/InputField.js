import React, { useState } from 'react';
import './InputField.css';

const InputField = (props) => {
  const [inputValue, setInputValue] = useState(props.value || '');

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className={`formGroup ${props.isValid ? '' : 'invalid'}`}>
      <label htmlFor={props.id}>
        <i className={`fas fa-${props.iconName}`}></i>
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        onChange={handleChange}
        autoComplete="off"
        value={inputValue}
      />
    </div>
  );
};

export default InputField;
