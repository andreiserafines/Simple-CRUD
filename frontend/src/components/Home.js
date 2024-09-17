import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [connectionStatus, setConnectionStatus] = useState('');

  useEffect(() => {
    console.log('Fetching database connection status...');

    axios.get('http://localhost/Dashboard%20ReactJs-PHP/backend/api/getRecords.php')
      .then((response) => {
        console.log(response); // Log the response to see what is received
        setConnectionStatus(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching the connection status:', error);
        setConnectionStatus('Unable to fetch the database connection status.');
      });
  }, []);

  return (
    <div className='container-fluid mt-4'>
      <div className="d-flex justify-content-between">
        <h4 className='text-dark'>Dashboard</h4>


        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
          </ol>
        </nav>

      </div>

      {/* Content Here */}
      <div className="p-3 rounded-2 shadow-sm bg-white">
      </div>
    </div>
  );
}

export default Home;
