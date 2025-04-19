import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ExpenseForm from './components/ExpenseForm';
import CategoryForm from './components/CategoryForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {isLoggedIn ? (
        <>
        <ExpenseForm />
        <CategoryForm />
        </>
      ) : (
        <>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
          <RegisterForm />
          <p>Please log in to manage your expenses.</p>
        </>
      )}
    </div>
  );
}

export default App;
