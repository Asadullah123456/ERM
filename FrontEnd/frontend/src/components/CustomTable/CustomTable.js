import React, { useEffect, useState } from 'react'
import './CustomTable.css';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

const CustomTable = ({onCreateContact, handleSelectedContact}) => {
    const [contactData, setContactData] = useState(null);


    useEffect(() => {
        const contacts = async () => {
            try{
                const response = await axios.get('http://localhost:4000/api/allContacts',{
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    }
                });
                if(response.status === 200){
                    setContactData(response.data.contacts);
                }
            }
            catch(error){
                if (error.response) {
                    // The request was made and the server responded with a status code
                    const statusCode = error.response.status;
                    console.error(`Server responded with status code: ${statusCode}`);
            
                    // Additional handling based on status code
                    switch (statusCode) {
                      case 404:
                        alert('User Not Found');
                        break;
                      case 401:
                        alert('Unauthorized. Please check your credentials.');
                        break;
                      // Add more cases as needed
                      default:
                        alert(`An unexpected error occurred (Status Code: ${statusCode}). Please try again later.`);
                        break;
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received from the server.');
                    alert('No response received from the server. Please try again later.');
                } else {
                    // Something happened in setting up the request
                    console.error('Error setting up the request:', error.message);
                    alert('An error occurred. Please try again later.');
                }
            }
        };
        contacts();
    }, []);

    const handleEditBtn = (contact) => {
      handleSelectedContact(contact);
      onCreateContact('UpdateContact');
    }

    const handleDeleteBtn = async (contactId) => {
      try {
        console.log(Cookies.get('token'));
        const response = await axios.put(`http://localhost:4000/api/delContact/${contactId}`,{}, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          }
        });

        if(response.status === 200){
          setContactData(prevData => prevData.filter(contact => contact._id !== contactId));
        }
      } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            const statusCode = error.response.status;
            console.error(`Server responded with status code: ${statusCode}`);
    
            // Additional handling based on status code
            switch (statusCode) {
              case 404:
                alert('User Not Found');
                break;
              case 401:
                alert('Unauthorized. Please check your credentials.');
                break;
              // Add more cases as needed
              default:
                alert(`An unexpected error occurred (Status Code: ${statusCode}). Please try again later.`);
                break;
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server.');
            alert('No response received from the server. Please try again later.');
        } else {
            // Something happened in setting up the request
            console.error('Error setting up the request:', error.message);
            alert('An error occurred. Please try again later.');
        }
      }
    };
    

    const generateRow = () => {
        return contactData.map((contact) => (
          <div className="products-row" key={contact._id}>
            <div className="product-cell image">
              <img src={contact.photo ? contact.photo : 'avatars/17004.png' } alt="product" />
              <span>{contact.contactName}</span>
            </div>
            <div className="product-cell category">{contact.contactEmail}</div>
            <div className="product-cell sales">{contact.phoneNumber}</div>
            <div className="product-cell sales">{new Date(contact.createdAt).toLocaleDateString()}</div>
            <div className="product-cell status-cell">
              <span className={`status ${contact.tag ? 'active' : ''}`}>{contact.tag}</span>
            </div>
            <div className="product-cell stock">
            <button onClick={() => handleEditBtn(contact)} className="editBtn">
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button onClick={() => handleDeleteBtn(contact._id)} className="delBtn">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ));
    };
    
  return (
    <div className="products-area-wrapper tableView">
        <div className="products-header">
            <div className="product-cell image">Contact Name</div>
            <div className="product-cell category">Contact Email</div>
            <div className="product-cell status-cell">Contact PhoneNumber</div>
            <div className="product-cell status-cell">Date Created</div>
            <div className="product-cell sales">Tag</div>
            <div className="product-cell stock">Actions</div>
        </div>
        { contactData === null || (Array.isArray(contactData) && contactData.length === 0) ? (
            <div className="placeholder-image d-flex flex-column justify-content-center align-items-center gap-1">
                <img src="avatars/404-illustration.png"  alt="placeholder" />
                <span>No contacts available</span>
            </div>
        ) : (
            generateRow()
        ) }
    </div>
  )
};

export default CustomTable;
