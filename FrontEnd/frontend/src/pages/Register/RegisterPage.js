import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/Logo.png';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import InputField from '../../components/InputField/InputField';
import InputButton from '../../components/InputButton/InputButton';
import AvatarComponent from '../../components/AvatarLibrary/AvatarLibrary';
import './RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;



const RegisterPage = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cnic, setCnic] = useState('');
    const [address, setAddress] = useState('');
    const [avatarImage, setAvatarImage] = useState('');
    const [firstNameIsValid, setFirstNameIsValid] = useState(true);
    const [lastNameIsValid, setLastNameIsValid] = useState(true);
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
    const [cnicIsValid, setCNICIsValid] = useState(true);
    const [addressIsValid, setAddressIsValid] = useState(true);

    const handleAvatarImageSelect = (imageURL) => {
        setAvatarImage(imageURL);
    };

    useEffect(() => {
        const nameRegex = /^[a-zA-Z ]+$/;    
        if (firstName.trim() === '' || !nameRegex.test(firstName)) {
            setFirstNameIsValid(false);
        } else {
            setFirstNameIsValid(true);
        }

        if (lastName.trim() === '' || !nameRegex.test(lastName)) {
            setLastNameIsValid(false);
        } else {
            setLastNameIsValid(true);
        }

        if (address.trim() === '') {
            setAddressIsValid(false);
        } else {
            setAddressIsValid(true);
        }
    }, [firstName, lastName, address]);

    useEffect(() => {
        // Updated CNIC regex to match the new format (XXXXX-XXXXXXX-X)
        const cnicRegex = /^[0-9]{5}[-][0-9]{7}[-][0-9]$/;

        setCNICIsValid(cnicRegex.test(cnic));
    }, [cnic]);

    useEffect(() => {
        // Updated phone number regex to match the new format (+92 XXX-XXXXXXX)
        const phoneRegex = /^\+92 [0-9]{3}-[0-9]{7}$/;

        setPhoneNumberIsValid(phoneRegex.test(phoneNumber));
    }, [phoneNumber]);



    useEffect(() => {
        setFirstNameIsValid(true);
        setLastNameIsValid(true);
        setPhoneNumberIsValid(true);
        setCNICIsValid(true);
        setAddressIsValid(true);
    }, []);


    useEffect(() => {
        const token = Cookies.get('token');

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


    const handleregister = async (e) => {
        e.preventDefault();

        if ((firstNameIsValid || firstName !== '') && (lastNameIsValid || lastName !== '') && (addressIsValid || address !== '') && (phoneNumberIsValid || phoneNumber !== '') && (cnicIsValid || cnic !== '')) {
            try {
                const response = await registerPerson(firstName, lastName, phoneNumber, address, cnic, avatarImage);

                if (response.status === 201 && Cookies.get('token')) {
                    navigate('/dashboard');
                } else if (!Cookies.get('token')) {
                    navigate('/');
                    alert('Your token session is complete');
                } else if (response.status === 403 && response.data.status === 'token-expire') {
                    // Handle token expiration, e.g., navigate back to login and remove the token
                    navigate('/');
                    Cookies.remove('token');
                    alert('Your token has expired. Please log in again.');
                }
            } catch (error) {
                console.log(`Error: ${error.response ? error.response.data : 'Unknown error'}`);
            }
        }
        else {
            alert('Red Label Fields are Invalid');
        }
    }

    const registerPerson = async (firstName, lastName, phoneNumber, address, cnic, avatarImage) => {
        console.log(avatarImage);
        try {
            const response = await axios.post(
                'http://localhost:4000/api/registerPerson',
                {
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    phoneNumber: phoneNumber,
                    cnic: cnic,
                    photoPath: avatarImage
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                }
            );
            return response;
        } catch (error) {
                console.error('Error in registerPerson:', error);
            if (error.response) {
                if (error.response.data.status === 'token-expire') {
                    navigate('/');
                    Cookies.remove('token');
                    alert('Your token has expired. Please log in again.');
                }
                console.error('Server responded with:', error.response.data);
            }
            throw error; // Re-throw the error to maintain the existing error handling behavior
        }
    };


    return (
      <>
          <section className='register'>
                <div className='custom-container container'>
                    <div className="pt-5 d-flex justify-content-center align-items-center">
                        <img width="130px" height="75px" src={Logo} alt="Logo img" />
                    </div>
                    <div className='register-content'>
                        <RegisterForm title='Personal Information' onSubmit={handleregister} >
                            <div className='row gy-5 mb-5'>
                                <div>
                                    <AvatarComponent onImageSelect={handleAvatarImageSelect} />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-6'>
                                    <InputField id='firstName' iconName='user' type='text' name='firstName' placeholder='Your FirstName' onChange={(e) => setFirstName(e.target.value)} isValid={firstNameIsValid} />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-6'>
                                    <InputField id='lastName' iconName='user-tie' type='text' name='lastName' placeholder='Your LastName' onChange={(e)=> setLastName(e.target.value)} isValid={lastNameIsValid} />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-6'>
                                    <InputField id='phoneNumber' iconName='phone' type='text' name='phoneNumber' placeholder='Your PhoneNumber (+92 XXX-XXXXXXX)' onChange={(e)=> setPhoneNumber(e.target.value)}  isValid={phoneNumberIsValid} />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-6'>
                                    <InputField id='cnic' iconName='id-card' type='text' name='cnic' placeholder='Your CNIC (XXXXX-XXXXXXX-X)' onChange={(e) => setCnic(e.target.value)}  isValid={cnicIsValid}  />
                                </div>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <InputField id='address' iconName='map-marker-alt' type='text' name='address' placeholder='Your Address' onChange={(e)=> setAddress(e.target.value)} isValid={addressIsValid} />
                                </div>
                            </div>
                            <InputButton name='register'  id='register' value='Confirm and Next' />
                        </RegisterForm>
                    </div>
                </div>
            </section>
      </>
  )
}

export default RegisterPage;