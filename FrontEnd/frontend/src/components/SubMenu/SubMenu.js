import React from 'react'
import { Link } from 'react-router-dom';
import './SubMenu.css';

const SubMenu = (props) => {
  return (
      <>
          <Link className='d-flex align-items-center subMenu-link' to={props.Link}><i className={`fas fa-${props.IconName}`}></i><span>{ props.Text}</span></Link>
      </>
  )
}

export default SubMenu;
