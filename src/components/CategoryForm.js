import React, { useState } from 'react';

function CategoryForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/categories/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const result = await response.json();
      setSuccessMessage(`Category "${result.name}" has been added successfully.`);
      setErrorMessage(null);
      setFormData({ name: '', description: '' });
    } catch (err) {
      setErrorMessage(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Add New Category</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default CategoryForm;