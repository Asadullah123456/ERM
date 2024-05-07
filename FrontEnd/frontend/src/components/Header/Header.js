import React from 'react'
import UserAvatar from '../UserAvatar/UserAvatar';
import './Header.css';

const Header = (props) => {
  return (
    <div className='avatar-MainDiv'>
        <h1>Email Management System</h1>
        <UserAvatar ImageURL={props.ImageURL} color={props.color} />
    </div>
  )
};

export default Header;
