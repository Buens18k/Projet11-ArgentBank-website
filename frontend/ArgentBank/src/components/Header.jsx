import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/argentBankLogo.png';
import { setSignOut } from '../redux/reducer/authSlice';
import '../styles/layouts/_header.scss';

export default function Header() {
  // Utilise le hook useSelector pour extraire la valeur de isAuthenticated depuis le store Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log('isAuthentificated', isAuthenticated);

  // Utilise le hook useDispatch pour obtenir la fonction de dispatch du store Redux
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.user);
  console.log("Profil de l'utilisateur", userProfile);

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleSignOut = () => {
    dispatch(setSignOut()); // Dispatch l'action setSingOut pour déconnecter l'utilisateur
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="./">
          <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        {/* Condition pour afficher des liens diffférents en fonction de l'authentification de l'utilisateur */}
        {isAuthenticated ? (
          // Si l'utilisateur est authentifié, affiche des liens vers la page utilisateur et la déconnexion
          <div>
            <Link className="main-nav-item" to="./profile">
              {/* <p>{userProfile ? userProfile.userName : 'Load'}</p> */}
              <i className="fa fa-user-circle"></i>
            </Link>
            <Link className="main-nav-item" to="./sign-in" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        ) : (
          // Si l'utilisateur n'est pas authentifié, affiche un lien vers la page de connexion
          <div>
            <Link className="main-nav-item" to="./login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
