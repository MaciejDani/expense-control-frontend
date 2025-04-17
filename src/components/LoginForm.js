import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Błędne dane logowania');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // zapisujemy token
      setIsLoggedIn(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
      {isLoggedIn ? (
        <p>Zalogowano pomyślnie 🎉</p>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>Nazwa użytkownika:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Hasło:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Zaloguj</button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginForm;