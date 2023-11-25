// App.js
import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import CategoryTable from './CategoryTable';
import HospitalForm from './HospitalForm';
import BedForm from './BedForm';


function App() {
  const [categories, setCategories] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [beds, setBeds] = useState([]);
  const [newCategory, setNewCategory] = useState({
    Bed_Category_Name: '',
    Bed_Category_Rate: '',
    Bed_Category_Insurance_Rate: '',
  });
  const [newBed, setNewBed] = useState({
    Bed_Name: '',
    Bed_Category_Id_FK: '',
    Bed_Active: true,
    Bed_Inactive_Reason: null,
  });
  const [showHospitalForm, setShowHospitalForm] = useState(true);
  const [showBedCategoryForm, setShowBedCategoryForm] = useState(false);
  const [showBedForm, setShowBedForm] = useState(false); 
  const [showTable, setShowTable] = useState(false); // State to toggle table visibility
  const [successMessage, setSuccessMessage] = useState('');

  const categoriesCollectionRef = collection(db, 'Bed_Category');
  const hospitalsCollectionRef = collection(db, 'Hospital_Info');
  const bedsCollectionRef = collection(db, 'Bed_Table');
  
  const createCategory = async () => {

    if (
      !newCategory.Bed_Category_Name ||
      !newCategory.Bed_Category_Rate ||
      !newCategory.Bed_Category_Insurance_Rate
    ) {
      setSuccessMessage('Please fill in all fields');
      setTimeout(() => {
        setSuccessMessage('');
      }, 1000);
      return;
    }

    
    const categoryToAdd = {
      ...newCategory,
      Created_Date: serverTimestamp(),
      Updated_Date: serverTimestamp(),
    };

    const docRef = await addDoc(categoriesCollectionRef, categoryToAdd);
    setCategories([...categories, { id: docRef.id, ...categoryToAdd }]);
    setNewCategory({
      Bed_Category_Name: '',
      Bed_Category_Rate: '',
      Bed_Category_Insurance_Rate: '',
    });

    // Show success message
    setSuccessMessage('Successfully added new category');

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 1000);
  };

  const updateCategory = async (id, updatedFields) => {
    const categoryDoc = doc(db, 'Bed_Category', id);
    const newFields = { ...updatedFields, Updated_Date: serverTimestamp() };
    await updateDoc(categoryDoc, newFields);
  
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, ...newFields } : category
      )
    );
  
    // Show success message only when the Save button is clicked
    if (Object.keys(updatedFields).length > 1) {
      setSuccessMessage('Saved Successfully ');
  
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 1000);
    }
  };

  const deleteCategory = async (id) => {
    const categoryDoc = doc(db, 'Bed_Category', id);
    await deleteDoc(categoryDoc);
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );

    // Show success message
    setSuccessMessage('Deleted Successfully ');

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 1000);
  };



  const addHospital = async (hospitalData) => {
    if (
      !hospitalData.Hospital_Name ||
      !hospitalData.Hospital_Address ||
      !hospitalData.Hospital_Pincode
    ) {
      setSuccessMessage('Please fill in all fields');
      setTimeout(() => {
        setSuccessMessage('');
      }, 1000);
      return;
    }

    const hospitalToAdd = {
      ...hospitalData,
      Created_Date: serverTimestamp(),
      Updated_Date: serverTimestamp(),
    };

    const docRef = await addDoc(hospitalsCollectionRef, hospitalToAdd);
    
    const bedCategoryCollectionRef = collection(doc(hospitalsCollectionRef, docRef.id), 'Bed_Category');
    const bedTableCollectionRef = collection(doc(hospitalsCollectionRef, docRef.id), 'Bed_Table');

  // Initialize the 'Bed_Category' and 'Bed_Table' collections with sample data or leave them empty
  // (you may need to adjust this based on your requirements)
  const sampleBedCategoryData = { 
      Bed_Category_Name: '',
      Bed_Category_Rate: '',
      Bed_Category_Insurance_Rate: '',
      Created_Date: serverTimestamp(),
      Updated_Date: serverTimestamp(),
  };
  const sampleBedTableData = { 
    
    Bed_Name: '',
    Bed_Category_Id_FK: '',
    Bed_Active: true,
    Bed_Inactive_Reason: null,
    Created_Date: serverTimestamp(),
      Updated_Date: serverTimestamp(),
   };
  await addDoc(bedCategoryCollectionRef, sampleBedCategoryData);
  await addDoc(bedTableCollectionRef, sampleBedTableData);
  
    setHospitals([...hospitals, { id: docRef.id, ...hospitalToAdd }]);
    setShowHospitalForm(false);
    setShowBedForm(true);
    setShowBedCategoryForm(true);

    // Show success message
    setSuccessMessage('Hospital added successfully');

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 1000);
  };

  const [bedNames, setBedNames] = useState([]);
  

  const createBed = async () => {
    if (!newBed.Bed_Name || !newBed.Bed_Category_Id_FK) {
      setSuccessMessage('Please fill in all fields');
      setTimeout(() => {
        setSuccessMessage('');
      }, 1000);
      return;
    }

    const bedToAdd = {
      ...newBed,
      Created_Date: serverTimestamp(),
      Updated_Date: serverTimestamp(),
    };

    const docRef = await addDoc(bedsCollectionRef, bedToAdd);
    setBeds([...beds, { id: docRef.id, ...bedToAdd }]);
    setBedNames((prevBedNames) => [...prevBedNames, newBed.Bed_Name]);
    setNewBed({
      Bed_Name: '',
      Bed_Category_Id_FK: '',
      Bed_Active: true,
      Bed_Inactive_Reason: null,
    });

    setSuccessMessage('Bed added successfully');
    setTimeout(() => {
      setSuccessMessage('');
    }, 1000);
  };



  useEffect(() => {
    const fetchData = async () => {
      const hospitalsData = await getDocs(hospitalsCollectionRef);
      setHospitals(
        hospitalsData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
  
      setShowTable(true); // Show the table after fetching data
    };
  
    fetchData();
  }, [hospitalsCollectionRef]);






  return (
    
    <div className="main">
      <div className="container">

      {showHospitalForm  && <HospitalForm addHospital={addHospital} /> }

      {showBedCategoryForm && (
        <div className="input-container">
          <div>
            <input
              type="text"
              placeholder="Bed Category (Hint: Bed for Double Occupancy Room, General Bed)"
              value={newCategory.Bed_Category_Name}
              onChange={(e) =>
                setNewCategory((prev) => ({
                  ...prev,
                  Bed_Category_Name: e.target.value,
                }))
              }
            />

            <br />
            <input
              type="text"
              placeholder=" Rate in INR/day (Hint: 2000)"
              value={newCategory.Bed_Category_Rate}
              onChange={(e) =>
                setNewCategory((prev) => ({
                  ...prev,
                  Bed_Category_Rate: e.target.value,
                }))
              }
            />
            <br />
            <input
              type="text"
              placeholder="Rate in INR/day for Insurance Holders (Hint: 1500) "
              value={newCategory.Bed_Category_Insurance_Rate}
              onChange={(e) =>
                setNewCategory((prev) => ({
                  ...prev,
                  Bed_Category_Insurance_Rate: e.target.value,
                }))
              }
            />
            <br />
            <button onClick={createCategory} className="bn5">
              Add Bed Category
            </button>
            {successMessage && (
              <div className={`success-message ${successMessage.includes('fill in all fields') ? 'error-message' : ''}`}>
              {successMessage}
            </div>
            )}
            
            {showTable && (
          <CategoryTable
            categories={categories}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
          />
        )}
      

        
          </div>
        </div>
        
      )}
      
        {showBedForm && (
          <BedForm
            categories={categories}
            createBed={createBed}
            newBed={newBed}
            setNewBed={setNewBed}
          />
        )}
        {bedNames.length > 0 && (
      <div className="Names">
      <h3>Bed Names:</h3>
      <ul>
      {beds.map((bed, index) => (
        <li key={index}>
          {bed.Bed_Name} - {categories.find(category => category.id === bed.Bed_Category_Id_FK)?.Bed_Category_Name}
        </li>
      ))}
    </ul>
  </div>
)}
        
      </div>
    </div>
    
  );
}

export default App;
