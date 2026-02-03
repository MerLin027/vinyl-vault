import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';
import defaultAvatar from '../assets/icons/default-avatar.svg';

const Profile = () => {
  const { currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  
  // Debug output to console
  useEffect(() => {
    console.log('Current user data:', currentUser);
  }, [currentUser]);
  
  // Use current user data if available, being flexible about field names
  const userData = {
    // Use username field if available, fall back to name field, otherwise use 'User'
    username: currentUser?.username || currentUser?.name || 'User',
    email: currentUser?.email || 'No email provided',
    phone: currentUser?.phone || 'Not provided',
    address: currentUser?.address || 'Not provided'
  };
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button 
          className="edit-button"
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      <div className="profile-content">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            <img src={defaultAvatar} alt="Profile Avatar" />
          </div>
          <div className="profile-meta">
            <h2 style={{textTransform: 'none'}}>{userData.username}</h2>
          </div>
        </div>
        
        <div className="profile-details">
          {editing ? (
            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="username" style={{textTransform: 'none'}}>Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  defaultValue={userData.username}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" style={{textTransform: 'none'}}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={userData.email}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" style={{textTransform: 'none'}}>Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={userData.phone}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address" style={{textTransform: 'none'}}>Address</label>
                <textarea
                  id="address"
                  name="address"
                  defaultValue={userData.address}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="save-button"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <h3 style={{textTransform: 'none'}}>Username</h3>
                <p>{userData.username}</p>
              </div>
              
              <div className="info-group">
                <h3 style={{textTransform: 'none'}}>Email</h3>
                <p>{userData.email}</p>
              </div>
              
              <div className="info-group">
                <h3 style={{textTransform: 'none'}}>Phone</h3>
                <p>{userData.phone}</p>
              </div>
              
              <div className="info-group">
                <h3 style={{textTransform: 'none'}}>Address</h3>
                <p>{userData.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 