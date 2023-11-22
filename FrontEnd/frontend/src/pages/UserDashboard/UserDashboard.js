import React, { useEffect, useState } from 'react';
import SideMinBar from '../../components/SideMinBar/SideMinBar';
import ContatSideBar from '../../components/ContactSideBar/ContatSideBar';
import EmailPage from '../../components/SideMainBar/SideMainBar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ProfilePage from '../ProfilePage/ProfilePage';

const UserDashboard = () => {
  const navigate = useNavigate();

  const [activeComponent, setActiveComponent] = useState('contacts');

  const handleSideBarItemClick = (component) => {
    setActiveComponent(component);
  };

  const renderActiveComponent = () => {
    switch(activeComponent){
      case 'contacts':
        return <ContatSideBar />;
      case 'email':
        return <EmailPage />;
      case 'settings':
        return <ProfilePage />
      default:
        return null;
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');

    // Scenario 1: Redirect to login if token is not present
    if (!token) {
      navigate('/');
    }

    // Cleanup function
    return () => {
      // Scenario 2: Remove token if user navigates back to login during unmount
      const currentPath = window.location.pathname;
      if (currentPath === '/' && token) {
        // Remove the token
        Cookies.remove('token');
        // Redirect to the login page
        navigate('/');
      }
    };
  }, [navigate]);

  return (
    <>
      <SideMinBar onSidebarItemClick={handleSideBarItemClick} />
      <Header ImageURL={'avatars/6.png'} color={'green'} />
      {renderActiveComponent()}
    </>
  );
};

export default UserDashboard;
