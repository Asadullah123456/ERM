import React from 'react';
import "./Form.css";


const Form = (props) => {
  return (
    <div className="form">
      <h2 className="form-title">{props.title}</h2>
      <form method="POST" className="register-form" onSubmit={props.onSubmit}>
        {props.children}
      </form>
    </div>
  );
};

export default Form;
