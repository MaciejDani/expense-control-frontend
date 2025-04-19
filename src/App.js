import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ExpenseForm from './components/ExpenseForm';
import CategoryForm from './components/CategoryForm';
import BudgetForm from './components/BudgetForm';
import StatsPage from './components/StatsPage';

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
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {isLoggedIn && (
        <nav>
          <Link to="/">Home</Link> | <Link to="/stats">Stats</Link>
        </nav>
      )}

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <>
                <ExpenseForm />
                <CategoryForm />
                <BudgetForm />
              </>
            ) : (
              <>
                <LoginForm onLoginSuccess={handleLoginSuccess} />
                <RegisterForm />
                <p>Please log in to manage your expenses.</p>
              </>
            )
          }
        />
        <Route
          path="/stats"
          element={
            isLoggedIn ? <StatsPage /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
