import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.styles.scss';

const Header = () => (
  <div className='header'>
    <NavLink className='header' to='/'>
      <h1>Gabella Music</h1>
    </NavLink>
  </div>
);

export default Header;
