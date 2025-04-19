import React, { useState } from 'react';

function StatsPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/reports/monthly-summary?year=${year}&month=${month}`, {
        headers: {
          Authorization: token
        }
      });

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

  return (
    <div>
      <h2>Monthly Summary</h2>

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

        <button onClick={fetchSummary}>Get Summary</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && (
        <div>
          <h3>Summary for {summary.year}/{summary.month}</h3>

          {summary.categorySum && Object.keys(summary.categorySum).length > 0 ? (
            <ul>
              {Object.entries(summary.categorySum).map(([category, sum]) => (
                <li key={category}>
                  {category}: {sum}
                </li>
              ))}
            </ul>
          ) : (
            <p>No expenses found for this month.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default StatsPage;