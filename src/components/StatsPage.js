import React, { useState } from 'react';

function StatsPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [summary, setSummary] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [error, setError] = useState(null);

  const currency = localStorage.getItem('currency') || 'PLN';

  const fetchSummary = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `http://localhost:8080/reports/monthly-summary?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      setSummary(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSummary(null);
    }
  };

  const fetchTotalExpenses = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `http://localhost:8080/reports/total-expenses?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch total expenses');
      }

      const data = await response.json();
      setTotalExpenses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTotalExpenses(null);
    }
  };

  return (
    <div>
      <h2>Monthly Statistics</h2>

      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />

        <label>Month:</label>
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        />

        <button onClick={fetchSummary}>Get summary</button>
        <button onClick={fetchTotalExpenses} style={{ marginLeft: '10px' }}>
          Get total amount of expenses
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && (
        <div>
          <h3>Summary for {summary.year}/{summary.month}</h3>
          {summary.categorySum && Object.keys(summary.categorySum).length > 0 ? (
            <ul>
              {Object.entries(summary.categorySum).map(([category, sum]) => (
                <li key={category}>
                  {category}: {sum} {currency}
                </li>
              ))}
            </ul>
          ) : (
            <p>No expenses found for this month.</p>
          )}
        </div>
      )}

      {totalExpenses !== null && (
        <div>
          <h3>Total amount of expenses for {month}/{year}:</h3>
          <p>{totalExpenses} {currency}</p>
        </div>
      )}
    </div>
  );
}

export default StatsPage;