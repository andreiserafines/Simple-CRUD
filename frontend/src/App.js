import React, { useState } from 'react'; // Import useState from React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import InputData from './components/InputData';
import ViewAll from './components/ViewAll';
import Sidebar from './reusable/Sidebar';  
import Header from './reusable/Header'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar

  // Toggle Sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the state
  };

  return (
    <Router>
      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        {isSidebarOpen && <Sidebar />} {/* Show Sidebar only when isSidebarOpen is true */}

        {/* Main Content Area */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Top Navbar */}
          <Header toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar function as prop */}

          {/* Page Content */}
          <div className="container-fluid flex-grow-1 bg-light">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/InputData" element={<InputData />} />
              <Route path="/ViewAll" element={<ViewAll />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
