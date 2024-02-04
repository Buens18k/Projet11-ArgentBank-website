import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/argentBankLogo.webp';
import { setSignIn, setSignOut } from '../redux/reducer/authSlice';
import '../styles/layouts/_header.scss';

export default function Header() {
  // Utilise le hook useSelector pour extraire la valeur de isAuthenticated depuis le store Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Utilise le hook useDispatch pour obtenir la fonction de dispatch du store Redux
  const dispatch = useDispatch();

  // Utilise le hook useSelector pour extraire le profil de l'utilisateur depuis le Redux store
  const userProfile = useSelector((state) => state.user);

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleSignOut = () => {
    dispatch(setSignOut()); // Dispatch l'action avec la fonction 'setSingOut' pour déconnecter l'utilisateur
  };

  // Utilise le hook useEffect pour vérifier la présence du token au chargement initial
  useEffect(() => {
    // Récupération du token depuis le LocalStorage
    const token = localStorage.getItem('authToken');
    // Si un token est présent alors
    if (token) {
      // Utilise dispatch et la fonction setSignin avec le token récupérer pour affirmé une authentification
      dispatch(setSignIn({ token }));
    }
    // Tableau de dépendance vide pour exécuter le useEffect à chaque rendu
  }, []);

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        {/* Condition pour afficher des liens diffférents en fonction de l'authentification de l'utilisateur */}
        {isAuthenticated ? (
          // Si l'utilisateur est authentifié, affiche des liens vers la page utilisateur et la déconnexion
          <div className="main-nav-ctaItem">
            <Link className="main-nav-item" to="./profile">
              <i className="fa fa-user-circle"></i>
              {userProfile ? userProfile.userName : 'Load'}
            </Link>
            <Link className="main-nav-item" to="./" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        ) : (
          // Si l'utilisateur n'est pas authentifié, affiche un lien vers la page de connexion
          <div className="main-nav-ctaItem">
            <Link className="main-nav-item" to="./login">
              <i className="fa fa-user-circle"></i>
              Sign-In
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
