import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/Logo.png';
import signUpImage from '../../assets/images/signup-image.jpg';
import ImageLink from '../../components/ImageLink/ImageLink';
import Form from '../../components/Form/Form';
import InputField from '../../components/InputField/InputField';
import InputButton from '../../components/InputButton/InputButton';
import './SignUpPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;


const SignUpPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [userNameIsValid, setUserNameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [repasswordIsValid, setRePasswordIsValid] = useState(true);
  const navigate = useNavigate();
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
    if (password === '' || !passwordRegex.test(password) || password.length < 7 || password !== repassword) {
      setPasswordIsValid(false);
      setRePasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
      setRePasswordIsValid(true);
    }
  }, [password, repassword]);
  
  useEffect(() => {
    setUserNameIsValid(true);
    setPasswordIsValid(true);
    setRePasswordIsValid(true);
  }, []);

  
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (userNameIsValid && passwordIsValid && repasswordIsValid) {
      const response = await fetchData(userName, password);
      console.log(response);
      try {
        if (response.status === 201 && Cookies.get('token')) {
          navigate('/register');
        }
        else {
          alert(`Failed to SignUp due to ${response.data}`);
        }
      }
      catch (err) {
        alert(err.message);
      }
    }
  };

  const fetchData = async (userName, password) => {
    try {
      const response = await axios.post('http://localhost:4000/api/signUp', {
        userName: userName,
        userPassword: password,
        role: 'Super-User'
      });
      return response;
    } catch (error) {
      console.error('AxiosError:', error);
      throw error; // Rethrow the error to be caught by the calling function
    }
  };


  return (
    <>
      <section className='sign-in'>
        <div className='custom-container container'>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <img width="130px" height="75px" src={Logo} alt="Logo img" />
            </div>
            <div className='signup-content'>
                <Form title='Sign Up' onSubmit={handleSignUp} >
                    <InputField id='userName' iconName='user' type='text' name='userName' placeholder='abc@ems.com' onChange={(e) => setUserName(e.target.value)} isValid={userNameIsValid}  />
                    <InputField id='password' iconName='lock' type='password' name='password' placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} isValid={passwordIsValid} />
                    <InputField id='repassword' iconName='eye-slash' type='password' name='repassword' placeholder='ReType Password' onChange={(e) => setRePassword(e.target.value)} isValid={repasswordIsValid} />
                    <InputButton name='signup'  id='signup' value='Register' />
                </Form>
                <ImageLink formName='signUp' imageUrl={signUpImage} anchorUrl='/' anchorText={`I'm Already a Member`} />
            </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;