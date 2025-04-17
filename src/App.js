import React from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ExpenseForm from './components/ExpenseForm';

function App() {
  return(
    <div>
      <Header />
      <p>Welcome to your expense control app!</p>
      <LoginForm />
      <RegisterForm />
      <ExpenseForm />
    </div>
  );
}
export default App;
