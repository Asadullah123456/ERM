import React, { useState, useEffect } from 'react'
import AvatarComponent from '../../components/AvatarLibrary/AvatarLibrary';
import InputField from '../../components/InputField/InputField';
import './ProfilePage.css';


const ProfilePage = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [avatarImage, setAvatarImage] = useState('');
    const [cnic, setCnic] = useState('');
    const [firstNameIsValid, setFirstNameIsValid] = useState(true);
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
    const [addressIsValid, setAddressIsValid] = useState(true);
    const [lastNameIsValid, setLastNameIsValid] = useState(true);
    const [userNameIsValid, setuserNameIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [cnicIsValid, setCnicIsValid] = useState(true);


    useEffect(() => {
        const usernameRegex = /^[a-zA-Z0-9._-]+@ems\.com$/;    
        if (userName.trim() === '' || !usernameRegex.test(userName)) {
            setuserNameIsValid(false);
        } else {
            setuserNameIsValid(true);
        }
    }, [userName]);

    useEffect(()=>{
        if(firstName.trim() === ''){
            setFirstNameIsValid(false);
        }
        else{
            setFirstNameIsValid(true);
        }
    },[firstName]);

    useEffect(() => {
        if(lastName.trim() === ''){
            setLastNameIsValid(false);
        }
        else{
            setLastNameIsValid(true);
        }
    },[lastName]);

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
        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
        if (password === '' || !passwordRegex.test(password) || password.length < 7) {
          setPasswordIsValid(false);
        } else {
          setPasswordIsValid(true);
        }
      }, [password]);

    useEffect(() => {
        // Updated CNIC regex to match the new format (XXXXX-XXXXXXX-X)
        const cnicRegex = /^[0-9]{5}[-][0-9]{7}[-][0-9]$/;

        setCnicIsValid(cnicRegex.test(cnic));
    }, [cnic]);

    const profileChanges = () => {
        if(userNameIsValid && passwordIsValid && firstNameIsValid && lastNameIsValid && addressIsValid && phoneNumberIsValid && cnicIsValid){
            console('Hi', avatarImage);
        }
    }


    useEffect(() => {
        setAvatarImage(true);
        setFirstNameIsValid(true);
        setPhoneNumberIsValid(true);
        setLastNameIsValid(true);
        setAddressIsValid(true);
        setuserNameIsValid(true);
        setPasswordIsValid(true);
        setCnicIsValid(true);
    }, []);


    return (
    <div className='profilePage'>
        <h3>Profile Settings</h3>
        <div className='container'>
            <AvatarComponent />
            <div className='row gy-5 mt-3'>
                <div className='col-lg-6 col-md-6 col-sm-6'>
                    <InputField id='userName' iconName='user' type='text' name='userName' placeholder='Username Here'  onChange={(e) => setUserName(e.target.value)} isValid={userNameIsValid}  />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6'>
                    <InputField id='password' iconName='eye' type='password' name='password' placeholder='Password Here' onChange={(e)=> setPassword(e.target.value)} isValid={passwordIsValid}  />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6'>
                    <InputField id='firstname' iconName='user' type='text' name='firstName' placeholder='FirstName Here'  onChange={(e) => setFirstName(e.target.value)} isValid={firstNameIsValid}  />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6'>
                    <InputField id='lastName' iconName='user-tie' type='text' name='lastName' placeholder='LastName Here' onChange={(e)=> setLastName(e.target.value)}  isValid={lastNameIsValid}  />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6'>
                    <InputField id='cnic' iconName='address-card' type='text' name='cnic' placeholder='Cnic Here' onChange={(e)=> setCnic(e.target.value)} isValid={cnicIsValid} />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6'>
                    <InputField id='phoneNumber' iconName='phone' type='text' name='phoneNumber' placeholder='Contact PhoneNumber (+92 XXX-XXXXXXX)' onChange={(e)=> setPhoneNumber(e.target.value)}  isValid={phoneNumberIsValid}  />
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <InputField id='address' iconName='map-marker-alt' type='text' name='address' placeholder='Address Here...' onChange={(e)=> setAddress(e.target.value)}  isValid={addressIsValid}  />
                </div>
            </div>
            <button className='saveChangesbtn' onClick={profileChanges} >Save Changes</button>
        </div>
    </div>
  )
};

export default ProfilePage;
