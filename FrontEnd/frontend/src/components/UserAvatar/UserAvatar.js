import React from 'react'
import './UserAvatar.css';

const UserAvatar = (props) => {
  return (
      <>
          <div className='UserAvatar-div'>
            <div className='UserAvatar'>
              <img src={props.ImageURL} alt="" />
            </div>
            <div className='Userstatus' style={{backgroundColor: props.color}} ></div>
          </div>
      </>
  )
}

export default UserAvatar;
