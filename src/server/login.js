const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); // import cors module

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = {
  'user1': "password1",
  'user2': 'password2',
};

app.post('/api/login', (req, res) => {
  const {username, password} = req.body;

  // Check if user exists
  if (users[username]) {
    // Validate password
    if (password === users[username]) {
      // Passwords match, generate and return a token
      const token = jwt.sign({username}, 'your-secret-key', { expiresIn: '1h' });
      return res.json({token});
    } else {
      // Passwords don't match
      return res.status(401).json({error: 'Invalid username or password'});
    }
  } else {
    // User doesn't exist
    return res.status(401).json({error: 'Invalid username or password'});
  }
});

app.post('/api/register', (req, res) => {
  const {username, password} = req.body;

  // Check if user already exists
  if (users[username]) {
    return res.status(400).json({error: 'User already exists'});
  }

  // Save the user with password in plain text
  users[username] = password;
  return res.json({message: 'User registered successfully'});
});

app.listen(3001, () => console.log('Server started on port 3001'));
