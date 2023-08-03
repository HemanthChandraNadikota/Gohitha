import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
// import Home from './Home';
// import Register from './Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>
  );
};

export default App;
