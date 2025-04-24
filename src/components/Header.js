import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
  return (
    <header>
      <h1>Expense Control App</h1>
      <nav style={{ marginTop: '10px' }}>
        {isLoggedIn && (
          <>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/stats" style={{ marginRight: '10px' }}>Stats</Link>
            <Link to="/compare" style={{ marginRight: '10px' }}>Compare</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;