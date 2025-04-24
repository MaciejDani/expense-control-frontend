import React, { useState } from 'react';

function CompareExpensesPage() {
  const [periods, setPeriods] = useState([{ year: new Date().getFullYear(), month: new Date().getMonth() + 1 }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const currency = localStorage.getItem('currency') || 'PLN';

  const handleChange = (index, field, value) => {
    const updated = [...periods];
    updated[index][field] = Number(value);
    setPeriods(updated);
  };

  const addPeriod = () => {
    setPeriods([...periods, { year: new Date().getFullYear(), month: 1 }]);
  };

  const removePeriod = (index) => {
    const updated = [...periods];
    updated.splice(index, 1);
    setPeriods(updated);
  };

  const handleCompare = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/reports/compare-multiple-expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(periods)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comparison data');
      }

      const data = await response.json();
      setResults(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResults([]);
    }
  };

  return (
    <div>
      <h2>Compare Monthly Expenses</h2>

      {periods.map((p, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <label>Year:</label>
          <input
            type="number"
            value={p.year}
            onChange={(e) => handleChange(index, 'year', e.target.value)}
          />
          <label style={{ marginLeft: '10px' }}>Month:</label>
          <input
            type="number"
            min="1"
            max="12"
            value={p.month}
            onChange={(e) => handleChange(index, 'month', e.target.value)}
          />
          {periods.length > 1 && (
            <button onClick={() => removePeriod(index)} style={{ marginLeft: '10px' }}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button onClick={addPeriod}>Add month</button>
      <button onClick={handleCompare} style={{ marginLeft: '10px' }}>
        Compare
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Comparison Result</h3>
          <ul>
            {results.map((res, idx) => (
              <li key={idx}>
                {res.month}/{res.year}: {res.totalExpenses} {currency}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CompareExpensesPage;