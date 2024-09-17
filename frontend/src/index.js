// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Includes Popper.js
import 'jquery/dist/jquery.min.js'; // Optional, if directly using jQuery

ReactDOM.render(<App />, document.getElementById('root'));
