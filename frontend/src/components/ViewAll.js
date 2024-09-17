import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import CustomModal from '../reusable/Modal'; // Import reusable Modal component

const ViewAll = () => {
    const [records, setRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [modalType, setModalType] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        age: ''
    });

    useEffect(() => {
        // Fetch records from the API
        axios.get('http://localhost/Dashboard%20ReactJs-PHP/backend/API/getRecords.php')
            .then(response => {
                setRecords(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleView = (record) => {
        setModalType('view');
        setCurrentRecord(record);
        setShowModal(true);
    };

    const handleEdit = (record) => {
        setModalType('edit');
        setCurrentRecord(record);
        setFormData({
            name: record.name,
            email: record.email,
            address: record.address,
            age: record.age
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentRecord(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSaveEdit = () => {
        // Send update request to the backend
        axios.post('http://localhost/Dashboard%20ReactJs-PHP/backend/API/updateRecord.php', {
            id: currentRecord.id,
            ...formData
        })
            .then(response => {
                setShowModal(false);
                setRecords(records.map(record =>
                    record.id === currentRecord.id ? { ...record, ...formData } : record
                ));
            })
            .catch(error => {
                console.error("There was an error updating the record!", error);
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Send delete request to the backend
                axios.post('http://localhost/Dashboard%20ReactJs-PHP/backend/API/deleteRecord.php', { id })
                    .then(response => {
                        console.log(response.data); // Log the response from the server
                        if (response.data.message === "Record deleted successfully") {
                            Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
                            // Remove the deleted record from the state
                            setRecords(records.filter(record => record.id !== id));
                        } else {
                            Swal.fire('Error!', 'There was an error deleting the record.', 'error');
                        }
                    })
                    .catch(error => {
                        console.error("There was an error deleting the record!", error);
                        Swal.fire('Error!', 'Failed to delete the record.', 'error');
                    });
            }
        });
    };


    return (
        <div className='container-fluid mt-4'>
            <div className="d-flex justify-content-between">
                <h4 className='text-dark'>Records</h4>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Records</li>
                    </ol>
                </nav>
            </div>

            <div className="p-3 rounded-2 shadow-sm bg-white">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length > 0 ? (
                            records.map((record) => (
                                <tr key={record.id}>
                                    <td className='text-capitalized'>{record.name}</td>
                                    <td className='text-lowercase'>{record.email}</td>
                                    <td>{record.address}</td>
                                    <td>{record.age}</td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => handleView(record)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(record)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(record.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Reusable Modal */}
            <CustomModal
                show={showModal}
                handleClose={handleCloseModal}
                title={modalType === 'view' ? 'View Record' : 'Edit Record'}
            >
                {currentRecord && (
                    <div>
                        {modalType === 'view' ? (
                            <div>
                                <p className='text-capitalized'><strong>Name:</strong> {currentRecord.name}</p>
                                <p className='text-lowercase'><strong>Email:</strong> {currentRecord.email}</p>
                                <p><strong>Address:</strong> {currentRecord.address}</p>
                                <p><strong>Age:</strong> {currentRecord.age}</p>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="number"
                                    className="form-control mb-3"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSaveEdit}
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </CustomModal>
        </div>
    );
};

export default ViewAll;
