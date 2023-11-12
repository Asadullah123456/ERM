import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/Logo.png';
import signInImage from '../../assets/images/signin-image.jpg';
import ImageLink from '../../components/ImageLink/ImageLink';
import Form from '../../components/Form/Form';
import './LoginPage.css';
import InputField from '../../components/InputField/InputField';
import InputButton from '../../components/InputButton/InputButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const LoginPage = () => {

    const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameIsValid, setUserNameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);


  useEffect(() => {
    // Validate username
    const usernameRegex = /^[a-zA-Z0-9._-]+@ems\.com$/;
    if (!userName.endsWith('@ems.com') || userName === '' || !usernameRegex.test(userName) || userName.length < 4) {
      setUserNameIsValid(false);
    } else {
      setUserNameIsValid(true);
    }
  }, [userName]);

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
    setUserNameIsValid(true);
    setPasswordIsValid(true);
  }, []);



  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!userNameIsValid || !passwordIsValid) {
      // Validation failed
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        userName,
        userPassword: password,
      });

      if (response.status === 200) {
        // Successful login
        navigate('/dashboard');
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
    
  return (
    <>
      <section className='sign-in'>
        <div className='custom-container container'>
          <div className="pt-5 d-flex justify-content-center align-items-center">
            <img width="130px" height="75px" src={Logo} alt="Logo img" />
          </div>
          <div className='signin-content'>
            <ImageLink formName='signIn' imageUrl={signInImage} anchorUrl='/signUp' anchorText='Create An Account' />
            <Form title='Sign In' onSubmit={handleSignIn} >
              <InputField id='userName' iconName='user' type='text' name='userName' placeholder='Your Username' onChange={(e) => setUserName(e.target.value)} isValid={userNameIsValid} />
              <InputField id='password' iconName='eye-slash' type='password' name='password' placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} isValid={passwordIsValid} />
              <div className='d-flex justify-content-end'>
                <Link to='/forgotPassword' className='forgot-link' >Forgot Password</Link>
              </div>
              <InputButton name='signin' id='signin' value='Login' />
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
