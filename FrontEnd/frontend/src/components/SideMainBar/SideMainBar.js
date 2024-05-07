import React, { useState, useEffect } from 'react'
import './SideMainBar.css';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import axios from 'axios';
axios.defaults.withCredentials = true;
const socket = io('http://localhost:4000/user-namespace', {
    auth:{
        token: Cookies.get('token')
    }
});

const SideMainBar = () => {

    const [contacts, setContacts] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [sender, setSender] = useState(null);
    const [typedMessage, setTypedMessage] = useState('');
    const [myPhoto, setMyPhoto] = useState(null);
    const [receiverPhoto, setReceiverPhoto] = useState(null);


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
                    setContacts(response.data.contacts);
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

        const getMyPhoto = async () => {
            try{
                const response = await axios.get('http://localhost:4000/api/getPhoto', {
                    headers:{
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    }
                });
                if(response.status === 200){
                    setMyPhoto(response.data.Photo);
                }
            }
            catch(err){
                console.log(err);
            }
        }

        getMyPhoto();

        const getUserID = async () => {
            try{
                const response = await axios.get('http://localhost:4000/api/getID', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    }
                });
                if(response.status === 200){
                    setSender(response.data.userID);
                }
            }
            catch(err){
                console.log(err);
            }
        }

        getUserID();
    }, []);


    const selectChat = (contact)=>{
        
        setSelectedChat(contact);
        fetchMessages(contact.contactIs);
        setReceiver(contact.contactIs);
        setReceiverPhoto(contact.photo);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleTimeString('en-US', options);
    };

    const generateMessage = () => {
        return messages.map((message) => (
          message.receiverID === receiver ? (
            <div key={message._id} className='left-message'>
              <div className='senderImage'>
                <img src={myPhoto} alt='' ></img>
              </div>
              <div className='senderDetails'>
                <p>{message.message}</p>
                <span className='datespan'>{formatTime(message.createdAt)}</span>
              </div>
            </div>
          ) : (
            <div key={message._id} className='right-message'>
              <div className='senderImage'>
                <img src={receiverPhoto} alt='' ></img>
              </div>
              <div className='senderDetails'>
                <p>{message.message}</p>
                <span className='datespan'>{formatTime(message.createdAt)}</span>
              </div>
            </div>
          )
        ));
      };
      


    const fetchMessages = async (id) => {
        try{
            const response = await axios.post('http://localhost:4000/api/getMessages', {
                receiverID: id,
            },{
                headers:{
                    "Content-Type" : "application/json",
                        Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });

            if(response.status === 200){
                setMessages(response.data.message);
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

    const generateRow = () => {
        return contacts.map((contact)=>(
            <div key={contact._id} id={contact.contactIs} className={`contactList ${selectedChat === contact ? 'active' : ''} `} onClick={ () => selectChat(contact)} >
                <div className='contact'>
                    <img src={`${contact.photo ? contact.photo : 'avatars/redBg.png'}`} alt='profileImage' />
                    <h3>{contact.contactName}</h3>
                </div>
            </div>
        ));
    };


    const sendMessage = async () => {
        if(typedMessage.trim() === ''){
            alert('Please Enter Message....');
            return;
        }
        try{
            const response = await axios.post('http://localhost:4000/api/createMessage', {
                receiverID: receiver,
                message: typedMessage 
            }, {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            if(response.status === 201){
                // socket.emit('NewMessage', response.data.message);
                setMessages((prevMessages) => [...prevMessages, response.data.message]);
                setTypedMessage('');
                socket.emit('NewMessage', response.data.message);
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
    }

    useEffect(() => {
        socket.on('loadNewMessage', (data)=> {
            if(sender === data.receiverID && receiver === data.senderID){
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        });
    }, [sender, receiver]);


  return (
      <>
          <div className='SideMainBar'>
            <div className='d-flex justify-content-between'>  
                <div className='rightSideMain'>
                        <div className='ChatSearch'>
                            <input type="text" name="emailSearch" id="emailSearch" placeholder='Search contact...' />
                            <i className='fas fa-search'></i>
                        </div>
                        <div className='ChatsSection'>
                        { contacts === null || (Array.isArray(contacts) && contacts.length === 0) ? (
            <div className="placeholder-image2 d-flex flex-column justify-content-center align-items-center gap-1 hv-60">
                <img src="avatars/dark_500-illustration.png"  alt="placeholder" />
                <span>No contacts available</span>
            </div>
        ) : (
            generateRow()
        ) }
                        </div>
                </div>
            </div>
          </div>
            <div className='emailForm'>
                <div className='messageDIv'>
                { messages === null || (Array.isArray(messages) && messages.length === 0) ? (
            <div className="placeholder-image d-flex flex-column justify-content-center align-items-center gap-1 hv-60">
                <img src="avatars/404-illustration.png"  alt="placeholder" />
                <span>No Messages Found</span>
            </div>
        ) : (
            generateMessage()
        ) }
                </div>
                <div className='messageInputBox'>
                    <input type="text" className="form-control" placeholder="Message Here..." value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)}  aria-label="Username" aria-describedby="basic-addon1" />
                    <button className='sendBtn' onClick={() => sendMessage()} ><i className="fa-regular fa-paper-plane"></i></button>
                </div>
                <div>

                </div>

            </div>
      </>
  )
}

export default SideMainBar;