import React from 'react'
import { Link } from 'react-router-dom';
import './IconAnchor.css';

const IconAnchor = (props) => {
  return (
      <>
        <Link className='IconAnchor' to={props.Link} title={props.title} onClick={props.onclick} ><i className={`fas fa-${props.IconName}`}></i></Link>
      </>
  )
}


export default IconAnchor;