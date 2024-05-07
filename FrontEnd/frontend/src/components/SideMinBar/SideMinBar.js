import React, { useState } from 'react';
import minLogo from '../../assets/images/EMSLogo.png';
import IconAnchor from '../IconAnchor/IconAnchor';
import './SideMinBar.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SideMinBar = ({ onSidebarItemClick }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('contacts');

  const logout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    onSidebarItemClick(itemId);
  };

  return (
    <div className='SideMinBar'>
      <div className='logo-div'>
        <img src={minLogo} alt="" />
      </div>
      <div className='d-flex justify-content-between align-items-center flex-column sideBar'>
        <ul className='sideUl upper-sideUl'>
          <li onClick={() => handleItemClick('contacts')}>
            <i className={`fas fa-house IconAnchor ${activeItem === 'contacts' ? 'active' : ''}`}></i>
          </li>
          <li onClick={() => handleItemClick('email')}>
            <i className={`fas fa-envelope IconAnchor ${activeItem === 'email' ? 'active' : ''}`}></i>
          </li>
        </ul>
        <ul className='sideUl'>
          <li onClick={() => handleItemClick('settings')}>
            <i className={`fas fa-gear IconAnchor ${activeItem === 'settings' ? 'active' : ''}`}></i>
          </li>
          <li>
            <IconAnchor Link='/' IconName='arrow-right-from-bracket' title='Logout' onclick={logout} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMinBar;
