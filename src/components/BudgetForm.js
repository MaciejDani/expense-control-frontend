import React, { useState } from 'react';

function BudgetForm() {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1, 
    amount: ''
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : parseInt(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/budgets/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          year: formData.year,
          month: formData.month,
          amount: formData.amount,
          initialAmount: formData.amount 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add budget');
      }

      const result = await response.json();
      setSuccessMessage(`Budget for ${formData.month}/${formData.year} set to ${result.amount}.`);
      setErrorMessage(null);
      setFormData((prev) => ({
        ...prev,
        amount: ''
      }));
    } catch (err) {
      setErrorMessage(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Set Monthly Budget</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Month:</label>
          <input
            type="number"
            name="month"
            value={formData.month}
            min="1"
            max="12"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Set Budget</button>
      </form>
    </div>
  );
}

export default BudgetForm;