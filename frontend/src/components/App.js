import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Main from '../pages/main';
import Users from '../pages/users';
import Login from '../pages/loginPage';
import Signup from '../pages/signup';
import Footer from './footer/Footer';


function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path='' element={<Main />} />
          <Route path='/users' element={<Users />} />
          <Route path='/session/new' element={<Login />} />
          <Route path='/users/new' element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
