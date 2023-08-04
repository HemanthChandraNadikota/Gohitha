import React, { useState } from 'react';
import './Register.css'; // Create a separate CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      console.log('Password and confirm password should match');
      return;
    }
    
    // Send POST request to server
    axios.post('http://13.49.219.0:3001/api/register', {
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      lastName : formData.lastName
    })
    .then(response => {
      alert('User registered successfully');
      navigate("/login")
    })
    .catch(error => {
      // Handle error. Show error message to user
      console.error('Something went wrong!', error);
    });
  };


  return (
    <div className="registration-container">
      <div className="left-side">
        <img
          src="images/flightbg.jpeg"
          alt="Flight"
        />
      </div>
      <div className="right-side">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <i
                className={`toggle-password ${
                  showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'
                }`}
                onClick={handleShowPassword}
              ></i>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className="register-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
