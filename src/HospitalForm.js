import React, { useState } from 'react';

const HospitalForm = ({ addHospital }) => {
  const [hospitalData, setHospitalData] = useState({
    Hospital_Name: '',
    Hospital_Address: '',
    Hospital_Pincode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Hospital_Pincode' && value.length > 6) {
      return;
    }
    setHospitalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Find the next input field and focus on it
      const formInputs = document.querySelectorAll('.hospital-form-input');
      const currentInputIndex = Array.from(formInputs).findIndex(
        (input) => document.activeElement === input
      );

      if (currentInputIndex !== -1 && currentInputIndex < formInputs.length - 1) {
        formInputs[currentInputIndex + 1].focus();
      } else {
        // If the last input field is focused, submit the form
        handleAddHospital();
      }
    }
  };

  const handleAddHospital = () => {
    addHospital(hospitalData);
    setHospitalData({
      Hospital_Name: '',
      Hospital_Address: '',
      Hospital_Pincode: '',
    });
  };

  return (
    <div>
      <h2>Hospital Information</h2>
      <label htmlFor="hospitalName">Hospital Name:</label>
      <input
        type="text"
        id="hospitalName"
        name="Hospital_Name"
        value={hospitalData.Hospital_Name}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="hospital-form-input"
      />

      <label htmlFor="hospitalAddress">Hospital Address:</label>
      <input
        type="text"
        id="hospitalAddress"
        name="Hospital_Address"
        value={hospitalData.Hospital_Address}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="hospital-form-input"
      />

      <label htmlFor="hospitalPincode">Hospital Pincode:</label>
      <input
        type="text"
        id="hospitalPincode"
        name="Hospital_Pincode"
        value={hospitalData.Hospital_Pincode}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="hospital-form-input"
      />

      <button onClick={handleAddHospital} className="bn3">
        Submit
      </button>
    </div>
  );
};

export default HospitalForm;
