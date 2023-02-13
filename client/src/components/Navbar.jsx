import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.jpg';
import { AuthContext } from '../context/authContext';

function Navbar() {
  const ctx = useContext(AuthContext);
  const { userLogout, currentUser } = ctx;
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className='link'>
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link to="/?cat=technology" className="link">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link to="/?cat=movie" className="link">
            <h6>MOVIE</h6>
          </Link>
          <span>{currentUser ? currentUser.username : undefined}</span>
          {currentUser ? <span onClick={userLogout}>logout</span> : <Link className='link' to="/login">login</Link>}
          <span className="write">
            <Link to="/write" className="link">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
