import React from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';

function App() {
  return(
    <div>
      <Header />
      <p>Welcome to your expense control app!</p>
      <LoginForm />
    </div>
  );
}
export default App;
