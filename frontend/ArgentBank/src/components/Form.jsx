import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import '../styles/components/_form.scss';

export default function Form() {
  const navigate = useNavigate();

  // Stockage des valeurs des champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Définition de la fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Création d'un objet 'formData avec les valeurs des champs du formulaire
    const formData = {
      email: email,
      password: password,
    };

    try {
      // Envoie d'une requête HTTP POST vers l'API pour la connexion de l'utilisateur
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Vérification de la réussite de la requête
      if (response.ok) {
        // Récupération des données de réponse au format JSON
        const responseData = await response.json();
        console.log(responseData);

        // Extraction du jeton d'authentification et sauvegarde dans le LocalStorage
        const token = responseData.body.token;
        localStorage.setItem('authToken', token);
        // Redirection vers la page utilisateur après une connexion réussie
        navigate('/user');
      } else {
        // En cas d'erreur, récupération des données d'erreur au format JSON
        const errorData = await response.json();
        console.error('Erreur :', response.statusText);
        // Mise à jour du message d'erreur à afficher dans le formulaire
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      // Gestion des erreurs imprévues pendant le processus d'envoi de la requête
      console.error('Erreur :', error);
      // Mise à jour du message d'erreur à afficher dans le formulaire
      setErrorMessage('an error has occured');
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>

      {/* Formulaire avec gestion conditionnelle de l'affichage du message d'erreur */}
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
