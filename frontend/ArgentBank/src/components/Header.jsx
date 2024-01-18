import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/argentBankLogo.png';
import '../styles/layouts/header.css';

import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img className='header-logo' src={Logo} alt="Argent Bank Logo" />
      </Link>

      <Nav />
    </header>
  );
}
