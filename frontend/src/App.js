// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
          <h4 className="text-center text-info">Simple Crud</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow-1">
          {/* Top Navbar */}
          <nav className="border navbar navbar-expand-lg navbar-light bg-light py-2">
            <div className="container-fluid">
              <span className="navbar-brand mb-0">Dashboard Navbar</span>
            </div>
          </nav>

          {/* Page Content */}
          <div className="container-fluid mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
