import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css'; // Create a separate CSS file for styling
import { useNavigate } from 'react-router-dom';
import { TravelContext } from '../../Context/TravelContext';
import { useContext } from 'react';
const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(TravelContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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

    // Send POST request to server
    axios.post('http://13.49.219.0:3001/api/login', formData)
      .then(response => {
        const token = response.data.token;
        // Store the token in localStorage
        localStorage.setItem('jwtToken', token);
        setIsAuthenticated(true)
        navigate("/travel")
        // Redirect to home or dashboard page
      })
      .catch(error => {
        // Handle error. Show error message to user
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data.error);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        alert("Incorrect Username or Password")
        navigate("/")
    });
  };

  useEffect(()=>{
    localStorage.removeItem("jwtToken");
  },[])

  return (
    <div className="login-container">
      <div className="left-side">
        <img
          src="images/flightbg.jpeg"
          alt="Flight"
        />
      </div>
      <div className="right-side">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
          <button className="loginbutton" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login ;
