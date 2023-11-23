import React from 'react';
import './SimpleButton.css';


const SimpleButton = (props) => {
  return (
      <button className='simpleBtn'>{ props.Text}</button>
  )
}

export default SimpleButton;