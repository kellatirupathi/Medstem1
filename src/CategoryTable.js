// CategoryTable.js
import React, { useState } from 'react';

const CategoryTable = ({ categories, updateCategory, deleteCategory }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);

  const handleEdit = (category) => {
    setEditingCategory(category.id);
  };

  const handleSave = (category) => {
    if (category.Bed_Category_Name.length > 100) {
        alert('Bed Category Name should not exceed 100 characters.');
        return;
      }

      if (String(category.Bed_Category_Rate).length > 15 || String(category.Bed_Category_Insurance_Rate).length > 15) {
        alert('Bed Category Rate and Insurance Rate should not exceed 15 characters.');
        return;
      }
      
    updateCategory(category.id, category);
    setEditingCategory(null);
  };

  const confirmDelete = (categoryId) => {
    

    if (confirmDelete) {
      deleteCategory(categoryId);
    }
  };

  

  return (
    <table>
      <thead>
        <tr>
          <th className="bed1">Bed Category</th>
          <th className="bed2">Rate</th>
          <th className="bed3">Insurance Rate</th>
          <th className="bed4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>
              {editingCategory === category.id ? (
                <input
                  type="text"
                  value={category.Bed_Category_Name}
                  onChange={(e) =>
                    updateCategory(category.id, {
                      Bed_Category_Name: e.target.value,
                    })
                  }
                />
              ) : (
                category.Bed_Category_Name
              )}
            </td>
            <td>
              {editingCategory === category.id ? (
                <input
                  type="text"
                  value={category.Bed_Category_Rate}
                  onChange={(e) =>
                    updateCategory(category.id, {
                      Bed_Category_Rate: Number(e.target.value),
                    })
                  }
                />
              ) : (
                category.Bed_Category_Rate
              )}
            </td>
            <td>
              {editingCategory === category.id ? (
                <input
                  type="text"
                  value={category.Bed_Category_Insurance_Rate}
                  onChange={(e) =>
                    updateCategory(category.id, {
                      Bed_Category_Insurance_Rate: Number(e.target.value),
                    })
                  }
                />
              ) : (
                category.Bed_Category_Insurance_Rate
              )}
            </td>
            <td>
              {editingCategory === category.id ? (
                <>
                  <button onClick={() => handleSave(category)}>Save</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(category)}>Edit</button>
                  <button onClick={() => setDeletingCategoryId(category.id)}>
                    Delete
                  </button>
                </>
              )}
              {deletingCategoryId === category.id && (
                <div className="delete-confirm">
                  <p>Do you want to delete  {category.Bed_Category_Name}??</p>
                  <button onClick={() => confirmDelete(category.id)}>Yes</button>
                  <button onClick={() => setDeletingCategoryId(null)}>No</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
