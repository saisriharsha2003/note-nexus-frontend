import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 
import user from "../assets/user.png";
import edit from "../assets/edit.png";
import delete1 from "../assets/delete.png";
import logout from "../assets/logout.png"
import toast from 'react-hot-toast';
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';

const Nav = () => {

  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('name');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    toast.success("Logging off...")
    localStorage.removeItem('username');
    navigate("/");
  };

  const toggleMenu = () => {
    if (document.getElementById("subMenu")) {
      let subm = document.getElementById("subMenu");
      subm.classList.toggle("open-menu");
    }
  };

  return (
    <div className="hero">
      <nav>
        <Link to="/home">
          <img className="logo" src= { logo } alt="App Logo" />
        </Link>

        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/view-notes">View Notes</Link>
          </li>
          <li>
            <Link to="/add-note">Add Note</Link>
          </li>
        </ul>

        <img
          src={user}
          className="user-pic"
          alt="User"
          onClick={toggleMenu} 
        />

        <div className="sub-menu-wrap" id="subMenu">
          <div className="sub-menu">
            <div className="user-info">
              <img src={user} alt="User" style={{ width: '80px', height: '80px' }} />
              <h2 id="cu_name" style={{ color: '#CCBA78' }}>{userName}</h2>
            </div>
            <hr />
            <Link to="/edit-profile" className="sub-menu-link">
              <img src={edit} alt="Edit Profile" style={{ width: '50px', height: '50px' }} />
              <p>Edit Profile</p>
              <span className="ext">&gt;</span>
            </Link>
            <Link to="/delete-profile" className="sub-menu-link">
              <img src={delete1} alt="Delete Account" style={{ width: '50px', height: '50px' }} />
              <p>Delete Account</p>
              <span className="ext">&gt;</span>
            </Link>
            <Link to="/" className="sub-menu-link" onClick={handleLogout}>
              <img src={logout} alt="Logout" style={{ width: '50px', height: '50px' }} />
              <p>Logout</p>
              <span className="ext">&gt;</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="signup">
        <div className="container" style={{ backgroundColor: 'black', opacity: 0.8 }}>
          <p style={{ fontSize: '40px', fontWeight: 600, color: '#CCBA78', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Welcome to <span className="homep">NoteNexus</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
