import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home() {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Values',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  });

  useEffect(() => {
    console.log('Fetching data...');

    axios.get('http://localhost/Dashboard%20ReactJs-PHP/backend/api/getRecords.php')
      .then((response) => {
        console.log(response.data); // Log the response to check the format

        // Extract the labels and data from the response
        const labels = response.data.map(record => record.name);  // Assuming 'name' is the label
        const data = response.data.map(record => record.value);   // Assuming 'value' is the data point

        setChartData({
          labels,
          datasets: [
            {
              label: 'Values',  // You can change the label based on the data
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }
          ]
        });
        setConnectionStatus('Data successfully fetched');
      })
      .catch((error) => {
        console.error('Error fetching the data:', error);
        setConnectionStatus('Unable to fetch the data.');
      });
  }, []);

  return (
    <div className='container-fluid mt-4'>
      <div className="d-flex justify-content-between">
        <h4 className='text-dark'>Dashboard</h4>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="Home">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
          </ol>
        </nav>
      </div>

      {/* Chart Section */}
      <div className="p-3 rounded-2 shadow-sm bg-white border-tops">
        <div className="chart-container mx-auto" style={{ width: '80%', height: '400px' }}>
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}

export default Home;
