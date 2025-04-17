import React from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return(
    <div>
      <Header />
      <p>Welcome to your expense control app!</p>
      <LoginForm />
      <RegisterForm />
    </div>
  );
}
export default App;
