import React, { useState, useEffect } from 'react'
import './ContactForm.css';
import AvatarComponent from '../AvatarLibrary2/AvatarLibrary';
import InputField from '../InputField/InputField';
import Cookies from 'js-cookie';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ContactForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tag, setTag] = useState('');
    const [address, setAddress] = useState('');
    const [avatarImage, setAvatarImage] = useState('');
    const [firstNameIsValid, setFirstNameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
    const [tagIsValid, setTagIsValid] = useState(true);
    const [addressIsValid, setAddressIsValid] = useState(true);

    // Update state based on props.contactData when it is provided
    useEffect(() => {
        if (props.contactData) {
            setFirstName(props.contactData.contactName || '');
            setEmail(props.contactData.contactEmail || '');
            setPhoneNumber(props.contactData.phoneNumber || '');
            setTag(props.contactData.tag || '');
            setAvatarImage(props.contactData.photoPath || '');
        }
    }, [props.contactData]);

    const handleAvatarImageSelect = (imageURL) => {
        setAvatarImage(imageURL);
    };

    const createContact = async (e) => {
        e.preventDefault();
        if(firstNameIsValid && emailIsValid && phoneNumberIsValid){
            try{
                const response = await axios.post('http://localhost:4000/api/createContact', {
                    contactName: firstName,
                    contactEmail: email,
                    phoneNumber: phoneNumber,
                    tag: tag,
                    photoPath: avatarImage
                },{
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    }
                });
                if(response.status === 201){
                    alert('Contact Saved Successfully');
                    props.onContactItemClick('viewContact');
                }
            }
            catch(error) {
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
        }
        else{
            setAddressIsValid('');
            setEmailIsValid('');
            setPhoneNumberIsValid('');
            setFirstNameIsValid('');
            setTagIsValid('');
        }
    }

    const updateContact = async (e) => {
        e.preventDefault();
        if(props.contactData){
            try{
                const response = await axios.put(`http://localhost:4000/api/updateContact/${props.contactData._id}`, {
                    contactName: firstName,
                    contactEmail: email,
                    phoneNumber: phoneNumber,
                    tag: tag,
                    photoPath: avatarImage
                },{
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    }
                });
                if(response.status === 200){
                    alert('Contact Updated Successfully');
                    props.onContactItemClick('viewContact')
                }
            }
            catch(error) {
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
        }
    }

    useEffect(() => {
        const nameRegex = /^[a-zA-Z ]+$/;
        if (firstName.trim() === '' || !nameRegex.test(firstName)) {
            setFirstNameIsValid(false);
        } else {
            setFirstNameIsValid(true);
        }
        
    }, [firstName]);
    
    useEffect(() => {
        const usernameRegex = /^[a-zA-Z0-9._-]+@ems\.com$/;    
        if (email.trim() === '' || !usernameRegex.test(email)) {
            setEmailIsValid(false);
        } else {
            setEmailIsValid(true);
        }
    }, [email]);

    useEffect(() => {
        if (address.trim() === '') {
            setAddressIsValid(false);
        } else {
            setAddressIsValid(true);
        }
    }, [address]);

    useEffect(() => {
        // Updated phone number regex to match the new format (+92 XXX-XXXXXXX)
        const phoneRegex = /^\+92 [0-9]{3}-[0-9]{7}$/;

        setPhoneNumberIsValid(phoneRegex.test(phoneNumber));
    }, [phoneNumber]);

    useEffect(() => {
        setFirstNameIsValid(true);
        setEmailIsValid(true);
        setPhoneNumberIsValid(true);
        setTagIsValid(true);
        setAddressIsValid(true);
    }, []);

    return (
      <>
        <div>
            <h2 className='main-heading'>{`${props.FormName} Contacts`}</h2>
        </div>
        <div className='row gy-5 mb-5'>
                    <div>
                        <AvatarComponent onImageSelect={handleAvatarImageSelect} profileImage={avatarImage} value={props.contactData ? props.contactData.photo : ''}  />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <InputField id='name' iconName='user' type='text' name='name' placeholder='Contact Name'  onChange={(e) => setFirstName(e.target.value)} isValid={firstNameIsValid} value={props.contactData ? props.contactData.contactName : ''}  />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <InputField id='email' iconName='envelope' type='text' name='email' placeholder='Contact Email' onChange={(e)=> setEmail(e.target.value)} isValid={emailIsValid} value={props.contactData ? props.contactData.contactEmail : ''}  />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <InputField id='phoneNumber' iconName='phone' type='text' name='phoneNumber' placeholder='Contact PhoneNumber (+92 XXX-XXXXXXX)' onChange={(e)=> setPhoneNumber(e.target.value)}  isValid={phoneNumberIsValid} value={props.contactData ? props.contactData.phoneNumber : ''}  />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <InputField id='tag' iconName='user-tag' type='text' name='tag' placeholder='Any Contact Tag' onChange={(e)=> setTag(e.target.value)}  isValid={tagIsValid} value={props.contactData ? props.contactData.tag : ''}  />
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12'>
                        <InputField id='address' iconName='map-marker-alt' type='text' name='address' placeholder='Address Here...' onChange={(e)=> setAddress(e.target.value)}  isValid={addressIsValid} value={props.contactData ? props.contactData.address : ''}  />
                    </div>
                </div>
                <div className='d-flex gap-2'> 
                    <button className='saveBtn' onClick={props.contactData ? updateContact : createContact}>
                        {props.contactData ? 'Update' : 'Save'}
                    </button>
                    <button className='backBtn' onClick={()=> props.onContactItemClick('viewContact')}>Go Back</button>
                </div>
      </>
  )
}

export default ContactForm;