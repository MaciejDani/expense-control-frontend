import React from 'react';

function Header({ isLoggedIn, onLogout }) {
  return (
    <header>
      <h1>Expense Control App</h1>
      {isLoggedIn && (
        <button onClick={onLogout}>Logout</button>
      )}
    </header>
  );
}

export default Header;