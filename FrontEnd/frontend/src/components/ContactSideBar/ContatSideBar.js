import React, { useState } from 'react'
import ViewContact from '../ViewContact/ViewContacts';
import ContactForm from '../ContactForm/ContactForm';
import './ContactSideBar.css';

const ContatSideBar = () => {
  const [contactActiveComponent, setContactActiveComponent] = useState('viewContact');
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactItemClick = (component) => {
    setContactActiveComponent(component);
  };

  const handleSelectedContact = (contact) => {
    setSelectedContact(contact);
  }

  const renderContactActiveComponent = () => {
    switch(contactActiveComponent){
      case 'viewContact':
        return <ViewContact onContactItemClick={handleContactItemClick} handleContactId={handleSelectedContact} />;
      case 'createContact':
        return <ContactForm onContactItemClick={handleContactItemClick} FormName={'Create'} />
      case 'UpdateContact':
        return <ContactForm onContactItemClick={handleContactItemClick} contactData={selectedContact} FormName={'Update'} />
      default:
        return null;
    }
  };


  return (
    <>
      <div className='mainBody'>
            <div className='container'>
              {renderContactActiveComponent()}
            </div>
        </div>
    </>
  )
}

export default ContatSideBar;
