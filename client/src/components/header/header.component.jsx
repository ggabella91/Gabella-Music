import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import Dropdown from 'react-bootstrap/Dropdown';
import './header.styles.scss';

const Header = ({ currentUser, signOutStart }) => {
  const handleRenderSettingsDropdown = () => {
    return currentUser !== null ? (
      <Dropdown>
        <Dropdown.Toggle as='dropdown-settings' id='dropdown-my-account'>
          My Account
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item value='settings' onClick={() => {}}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item
            value='sign-out'
            onClick={() => {
              signOutStart();
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : null;
  };

  return (
    <div className='header-container'>
      <NavLink className='header' to='/'>
        <h1>Gabella Music</h1>
      </NavLink>
      <div className='dropdown-settings-container'>
        {handleRenderSettingsDropdown()}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
