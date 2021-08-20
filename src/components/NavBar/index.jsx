import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../pages/router';
import './index.scss';

function NavBar() {
  return (
    <header className="navbar">
      <div className="top-nav">Lider</div>
      <nav className="bottom-nav">
        <ul>
          {routes.map((route) => (
            <li key={route.name}>
              <Link key={route.name} to={route.path}>
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
