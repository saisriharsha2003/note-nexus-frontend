import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const MainNav = () => {
    return (
        <div>
            <nav >
          <Link to="/">
            <img className="logo" src={logo} alt="SmartBill Logo" />
          </Link>
          <ul>
            <li><Link to="/" >Home</Link></li>
            
            <li>
              <Link to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login">
                Login
              </Link>
            </li>
          </ul>
        </nav>
        </div>
    )
};

export default MainNav;
