import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import '../styles/components/_form.scss';

export default function Form() {
  const navigate = useNavigate();

  // Stockage des valeurs des champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction qui envoie le formulaire pour login le user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupérer les valeurs des champs du formulaire
    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        const token = responseData.body.token;
        localStorage.setItem('authToken', token);
        navigate('/user');
      } else {
        const errorData = await response.json();
        console.error('Erreur :', response.statusText);
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Erreur :', error);
      setErrorMessage('an error has occured');
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="errorMsg">{errorMessage}</p>}
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
}
