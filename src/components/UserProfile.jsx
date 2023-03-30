import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./UserProfile.css"; 

function UserProfile () {
    
    return (
      
      <div>
        
        <div className="user-profile-container">
      <div className="row">
        <div className="col-md-4">
          <div className="user-picture">
            <img src="https://via.placeholder.com/150" alt="User" />
            <h2>First Name Last Name</h2>
            <h3>User Name</h3>
          </div>
        </div>
        
      </div>
      <div className="row">
      <div  className="col-md-4">
          <div className="user-basic-data">
            <h2>Personal Details</h2>            
            <div class="row">
              <div class="col-3 labels">
                <p>Email </p>
                <p>Age </p>
                <p>Gender</p>
                <p>City</p>
                <p>State</p>
              </div>              
            </div>
          </div>
        </div>       
        <div className="col-md-8">
          <div className="user-other-interests">
            <h2>Other Details</h2>
            <div class="row">
              <div class="col-4 labels">
                <p>Favorite Category of Events</p>
                <p>Are you a Venue Owner?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className='btn-uprofile'>Update</button>
      </div>
    </div>
    
    </div>
  );
  };

  export default UserProfile;