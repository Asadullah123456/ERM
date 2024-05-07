import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/Logo.png';
import InputField from '../../components/InputField/InputField';
import InputButton from '../../components/InputButton/InputButton';
import ImageLink from '../../components/ImageLink/ImageLink';
import Form from '../../components/Form/Form';
import signInImage from '../../assets/images/signin-image.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;


const ForgotPage = () => {
    
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [userNameIsValid, setUserNameIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [rePasswordIsValid, setRePasswordIsValid] = useState(true);

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
        if (password === '' || !passwordRegex.test(password) || password.length < 7 || password !== rePassword) {
            setPasswordIsValid(false);
            setRePasswordIsValid(false);
        } else {
            setPasswordIsValid(true);
            setRePasswordIsValid(true);
        }
    }, [password, rePassword]);
    
    useEffect(() => {
        setUserNameIsValid(true);
        setPasswordIsValid(true);
        setRePasswordIsValid(true);
    }, []);

    const handleForgot = async (e) => {
        e.preventDefault();

        if (userNameIsValid && userName !== '' && password !== '' && passwordIsValid && rePassword !== '' && rePasswordIsValid) {
            try {
                const response = await axios.post('http://localhost:4000/api/userExist', {
                    userName: userName
                });
                if (response.status === 200) {
                    const secondresponse = await axios.post('http://localhost:4000/api/changePassword', {
                        userName: userName,
                        password: password
                    });
                    if (secondresponse.status === 200) {
                        navigate('/');
                    }
                }
            }
            catch (error) {
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
                }else if (error.request) {
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
    
    return (
        <>
            <section className='sign-in'>
                <div className='custom-container container'>
                    <div className="pt-5 d-flex justify-content-center align-items-center">
                        <img width="130px" height="75px" src={Logo} alt="Logo img" />
                    </div>
                    <div className='signin-content'>
                        <ImageLink formName='signIn' imageUrl={signInImage} anchorUrl='/' anchorText='Back to Login Page' />
                        <Form title='Forgot Password' onSubmit={handleForgot} >
                            <InputField id='userName' iconName='user' type='text' name='userName' placeholder='Your Username' onChange={(e) => setUserName(e.target.value)} isValid={userNameIsValid} />
                            <InputField id='password' iconName='lock' type='password' name='password' placeholder='Your Password' onChange={(e) => setPassword(e.target.value)} isValid={passwordIsValid} />
                            <InputField id='repassword' iconName='eye-slash' type='password' name='repassword' placeholder='ReType Password' onChange={(e) => setRePassword(e.target.value)} isValid={rePasswordIsValid} />
                            <InputButton name='signin'  id='signin' value='Confirm' />
                        </Form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ForgotPage;
