import React, { useState } from 'react';
import './AvatarLibrary.css'; // Import your CSS file


const AvatarComponent = ({ onImageSelect }) => {
  const [isAvatarDivActive, setAvatarDivActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const avatar = ['2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'];

  const handleAvatarClick = (avatarSrc) => {
    setSelectedImage(`avatars/${avatarSrc}`);
      setAvatarDivActive(false);
      onImageSelect(`avatars/${avatarSrc}`);
  };

  const handleAddAvatarClick = (event) => {
    event.preventDefault();
    setAvatarDivActive(true);
  };

  const handleRemoveAvatarClick = (event) => {
    event.preventDefault();
    setSelectedImage('');
    setAvatarDivActive(false);
    onImageSelect('');
  };

  const handleAvatarDivClose = (event) => {
    event.preventDefault();
    setAvatarDivActive(false);
  };

  return (
    <div className="avatar-upload">
      <div>
        <button className="addAvatar" onClick={handleAddAvatarClick}>
          <i className="fas fa-camera"></i>
        </button>
        <button className="removeAvatar" onClick={handleRemoveAvatarClick}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <div className="avatar-preview">
        <div
          className={`imagePreview ${selectedImage ? '' : 'active'}`}
          style={{ backgroundImage: `url('${selectedImage}')` }}
        ></div>
      </div>

      {isAvatarDivActive && (
        <div className="avatarDiv active">
          <div className="d-flex justify-content-end">
            <button className="closeBtn" onClick={handleAvatarDivClose} >
              <i className="fas fa-close"></i>
            </button>
          </div>
          <div className="container avatarContainer">
            <div className='d-flex flex-wrap gap-4 justify-content-between mt-4 mx-3 mb-3'>
              {avatar.map((avatarSrc, index) => (
              <div key={index} className="w-60" onClick={() => handleAvatarClick(avatarSrc)}>
                <img src={`avatars/${avatarSrc}`} alt="Avatar" className="w-100 h-100 object-fit" />
              </div>
            ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarComponent;
