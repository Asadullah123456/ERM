import React from 'react'
import './RegisterForm.css';

const RegisterForm = (props) => {
  return (
      <>
        <div className="registerForm">
            <h2 className="form-title">{props.title}</h2>
            <form method="POST" className="register-form" onSubmit={props.onSubmit}>
                {props.children}
            </form>
        </div>
      </>
  )
}

export default RegisterForm;