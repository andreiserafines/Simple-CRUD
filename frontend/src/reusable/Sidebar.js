// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrSystem } from "react-icons/gr";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BsClipboard2DataFill } from "react-icons/bs";

function Sidebar() {
  const location = useLocation(); // Get the current location

  return (
    <div className="bg-dark border-bottom text-white d-flex flex-column align-items-start p-3" style={{ width: '250px' }}>
      <h4 className="mx-auto text-center text-warning text-uppercase fs-5 mb- d-flex align-items-center">
        <GrSystem className="me-2" />
        Dashboard
      </h4>

      <ul className="nav flex-column mt-2 w-100">
        <li className="nav-item">
          <Link
            className={`nav-link fw-normal rounded-2 d-flex align-items-center px-3 py-2 
            ${location.pathname === "/" ? "bg-primary text-white" : "text-light"}`} 
            to="/"
          >
            <MdDashboard className="me-2" />
            Home
          </Link>
        </li>
        
        <li className="nav-item">
          <Link
            className={`nav-link fw-normal rounded-2 d-flex align-items-center px-3 py-2 
            ${location.pathname === "/InputData" ? "bg-primary text-white" : "text-light"}`} 
            to="/InputData"
          >
            <HiOutlinePencilAlt className="me-2" />
            Input Data
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link fw-normal rounded-2 d-flex align-items-center px-3 py-2 
            ${location.pathname === "/ViewAll" ? "bg-primary text-white" : "text-light"}`} 
            to="/ViewAll"
          >
            <BsClipboard2DataFill className="me-2" />
            Records
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
