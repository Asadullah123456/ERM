import React, { useState, useEffect } from 'react'
import './ViewContact.css';
import handShake from '../../assets/images/handshake.svg';
import CustomTable from '../CustomTable/CustomTable';
import Cookies from 'js-cookie';
import axios from 'axios';
axios.defaults.withCredentials = true;

const UserDisplay = ({ onContactItemClick, handleContactId }) => {
    const [UserName, setUserName] = useState('');

    useEffect( () => {
        const getUserName = async () => {
          try{
            const response = await axios.get('http://localhost:4000/api/getUserName',{
              headers:{
                Authorization: `Bearer ${Cookies.get('token')}`,
              }
            });
            if(response.status === 200){
              setUserName(response.data.UserName);
            }
          }
          catch(err){
            console.log(err);
          }
        }
        getUserName();
      }, []);

  return (
      <>
        <div className='d-flex align-items-end'>
            <h2 className='user-heading'>Welcome, {UserName}</h2>
            <img className='handshakeIcon' src={handShake} alt='Handshake Icon'/>
        </div>
        <div>
            <h3 className='main-heading'>All Contacts</h3>
            <div className='container'>
                <div className='d-flex align-items-center justify-content-between mt-5 pe-4 gap-3'>
                    <div className='d-flex align-items-center gap-3'>
                        <div className='position-relative' ><input className="search-bar" placeholder="Search..." type="text" />
                            <i className='fas fa-search search-icon'></i>
                        </div>
                        <div className="filter-button-wrapper">
                            <button className="action-button filter jsFilter">
                                <img src='avatars/handIcon.svg' alt='handleIcon' ></img>
                            </button>
                        </div>
                    </div>   
                    <button onClick={()=> {onContactItemClick('createContact')}} className="app-content-headerButton">Add Contact</button>
                </div>
                <CustomTable onCreateContact={onContactItemClick} handleSelectedContact={handleContactId} />
            </div>
        </div>
      </>
  )
}

export default UserDisplay;