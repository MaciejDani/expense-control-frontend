import React, { useState, useEffect } from 'react';

function ExpenseForm() {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    categoryId: '',
    currency: 'PLN'
  });

  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token being sent:", token);
  
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/categories/all', {
          headers: {
            Authorization: token 
          }
        });
  
        console.log("Response status:", response.status);
  
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
  
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const result = await response.json();
      setSuccessMessage(`Expense added: ${result.description} (${result.amount} ${result.currency})`);
      setErrorMessage(null);
      setFormData({
        amount: '',
        date: '',
        description: '',
        categoryId: '',
        currency: 'PLN'
      });
    } catch (err) {
      setErrorMessage(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Add New Expense</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
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
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a category --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Currency:</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="PLN">PLN - Polish Zloty</option>
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - US Dollar</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="SEK">SEK - Swedish Krona</option>
            <option value="NOK">NOK - Norwegian Krone</option>
            <option value="CZK">CZK - Czech Koruna</option>
          </select>
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;