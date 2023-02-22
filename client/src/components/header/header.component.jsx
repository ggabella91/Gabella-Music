import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import './header.styles.scss';
import SelectInput from '../select-input/select-input';

const settingsOptions = [
  { value: 'settings', displayValue: 'Settings' },
  { value: 'sign-out', displayValue: 'Sign Out' },
];

const Header = ({ currentUser, signOutStart }) => {
  const [settingsOption, setSettingsOption] = useState('');
  let history = useHistory();

  useEffect(() => {
    if (settingsOption === 'settings') {
      history.push('/settings');
    } else if (settingsOption === 'sign-out') {
      signOutStart();
    }
  }, [history, settingsOption, signOutStart]);

  return (
    <div className='header-container'>
      <NavLink className='header' to='/'>
        <h1>Gabella Music</h1>
      </NavLink>
      <div className='dropdown-settings-container'>
        {!!currentUser && (
          <SelectInput
            options={settingsOptions}
            selectedValue={settingsOption}
            setSelectedValue={setSettingsOption}
            defaultValue='My Account'
          />
        )}
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
