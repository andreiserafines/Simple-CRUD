// Header.js
import { GiHamburgerMenu } from "react-icons/gi";
import React from 'react';

function Header({ toggleSidebar }) {  // Accept the toggleSidebar function as a prop
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <button 
          className="btn btn-outline-white" 
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu className=""/>
        </button>
        <span className="navbar-brand">Navigation Bar</span>
      </div>
    </nav>
  );
}

export default Header;
