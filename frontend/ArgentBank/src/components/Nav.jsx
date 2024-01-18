import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/nav.css';

// library.add()

export default function Nav() {
  return (
    <nav className="main-nav">
      <div className="main-nav-container">
        <div className='main-nav-container-user'>
          <span className='name-user'>Ben_hg</span>
          <Link to="./user" className="main-nav-item" href="./sign-in.html">
            <i className="fa fa-user-circle"></i>
          </Link>
        </div>
        <Link to="./setting" className="main-nav-item" href="./sign-in.html">
          {/* Logo setting */}
          <i className="fa fa-regular fa-gear"></i>
        </Link>
        <Link to="./" className="main-nav-item" href="./sign-in.html">
          <i className="fa fa-solid fa-power-off"></i>
        </Link>
      </div>
    </nav>
  );
}
