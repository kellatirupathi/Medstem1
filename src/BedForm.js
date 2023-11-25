// BedForm.js
import React, { useState } from 'react';

const BedForm = ({ categories, createBed, newBed, setNewBed }) => {
  const [displayedBed, setDisplayedBed] = useState(null);

  const handleAddBed = () => {
    // Call the createBed function
    createBed();

    // Set the displayed bed name and category
    setDisplayedBed({
      bedName: newBed.Bed_Name,
      categoryName: categories.find(category => category.id === newBed.Bed_Category_Id_FK)?.Bed_Category_Name,
    });
  };

  return (
    <div className="input-container">
      <div>
        <input
          type="text"
          placeholder="Bed Name"
          value={newBed.Bed_Name}
          onChange={(e) => setNewBed((prev) => ({ ...prev, Bed_Name: e.target.value }))}
        />
        <br />
        <select
          value={newBed.Bed_Category_Id_FK}
          onChange={(e) =>
            setNewBed((prev) => ({ ...prev, Bed_Category_Id_FK: e.target.value }))
          }
        >
          <option value="">Select Bed Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.Bed_Category_Name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button onClick={handleAddBed} className="bn5">
          Add Bed
        </button>
      </div>

      {displayedBed && (
        <div>
          <h2>Recently added Bed</h2>
          <p>Bed Name: {displayedBed.bedName}</p>
          <p>Bed Category: {displayedBed.categoryName}</p>
        </div>
      )}
    </div>
  );
};

export default BedForm;
