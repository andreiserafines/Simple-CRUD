// src/reusable/SweetAlertButton.js
import React from 'react';
import Swal from 'sweetalert2';

function SweetAlertButton({ title, text, icon, confirmButtonText }) {
  const showSweetAlert = () => {
    Swal.fire({
      title: title || 'Default Title',
      text: text || 'Default text content.',
      icon: icon || 'info',
      confirmButtonText: confirmButtonText || 'OK',
    });
  };

  return (
    <button onClick={showSweetAlert} className="btn btn-primary">
      Show SweetAlert
    </button>
  );
}

export default SweetAlertButton;
