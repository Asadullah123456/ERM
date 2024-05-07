import React, { useState, useEffect } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import { Link } from 'react-router-dom';
import './ChatDisplay.css';

const ChatDisplay = (props) => {
  const [unseen, setUnseen] = useState('transparent');

  useEffect(() => {
    const unseenStyle = props.UnseenMessage !== '' ? 'blue' : 'transparent';
    setUnseen(unseenStyle);
  }, [props.UnseenMessage]);

  return (
    <>
      <Link className='d-flex align-items-end chatDisplay' to='/'>
        <UserAvatar ImageURL={props.ImageURL} color={props.color} />
        <div className='chatUserDetail'>
          <h4 className='userName'>{props.UserName}</h4>
          <p className='messageHint'>{props.Text}</p>
        </div>
        <div className='chatDate'>
          <p className='time'>{props.Time}</p>
          <p className='UnseenMessage' style={{ backgroundColor: unseen }}>{props.UnseenMessage}</p>
        </div>
      </Link>
    </>
  );
};

export default ChatDisplay;
