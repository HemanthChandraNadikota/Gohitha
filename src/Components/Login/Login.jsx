import React, { useState } from 'react';
import './Login.css'; // Create a separate CSS file for styling

const Login = () => {
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
    // Handle login logic here, e.g., sending form data to the server
    console.log(formData);
  };

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
