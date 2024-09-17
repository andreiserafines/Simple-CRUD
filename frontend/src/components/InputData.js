import React, { useState } from 'react';
import axios from 'axios';

const InputData = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        age: ''
    });
    const [message, setMessage] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send a POST request to insert the data
        axios.post('http://localhost/Dashboard%20ReactJs-PHP/backend/API/insertRecord.php', formData)
            .then(response => {
                setMessage(response.data.message); // Display success or error message
                // Clear form fields after successful submission
                setFormData({
                    name: '',
                    email: '',
                    address: '',
                    age: ''
                });
            })
            .catch(error => {
                console.error("There was an error submitting the form!", error);
            });
    };

    return (
        <div className='container-fluid mt-4'>
            <div className="d-flex justify-content-between">
                <h4 className='text-dark'>Input Data</h4>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Records</li>
                    </ol>
                </nav>
            </div>

            <div className="p-3 rounded-2 shadow-sm bg-white container-sm border-tops">
                <p className="mb-4 text-dark mb-3">Insert New Record</p>
                {message && <p className="alert alert-info">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default InputData;
