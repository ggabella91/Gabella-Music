import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { checkUserSession } from '../../redux/user/user.actions';

import { selectIsConnected } from '../../redux/spotify/spotify.selectors';
import {
  checkConnection,
  disconnectStart,
} from '../../redux/spotify/spotify.actions.js';

import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import './settings-page.styles.scss';

const SettingsPage = ({
  checkUserSession,
  currentUser,
  checkConnection,
  isConnected,
  disconnectStart,
}) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });

  const [userPassword, setUserPassword] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });

  const handleSubmitInfo = async (event) => {
    event.preventDefault();

    // changeInfoStart(name, email);
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();

    // changePasswordStart(name, email);
  };

  // const [show, setShow] = useState(true);

  const { name, email } = userInfo;
  const { passwordCurrent, password, passwordConfirm } = userPassword;

  useEffect(() => {
    checkUserSession();
  }, []);

  let history = useHistory();

  useEffect(() => {
    if (currentUser === null) {
      history.push('/');
    }
  }, [currentUser]);

  useEffect(() => {
    if (isConnected) {
      checkConnection();
    }
  }, [isConnected]);

  const handleRenderDisconnectButton = () =>
    isConnected ? (
      <Button
        className='button settings-button disconnect'
        onClick={disconnectStart}
      >
        <span>Disconnect From Spotify</span>
      </Button>
    ) : null;

  const handleBackToHomePage = () => {
    history.push('/me');
  };

  const handleInfoChange = (event) => {
    const { value, name } = event.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (event) => {
    const { value, name } = event.target;

    setUserPassword({ ...userPassword, [name]: value });
  };

  return (
    <div className='settings home'>
      <Button
        className='button settings-button'
        onClick={(e) => {
          e.preventDefault();
          handleBackToHomePage();
        }}
      >
        <span>Back to Home</span>
      </Button>
      <form className='change-info' onSubmit=''>
        <span>Update your info</span>
        <FormInput
          type='text'
          name='name'
          value=''
          onChange=''
          label='name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value=''
          onChange=''
          label='email'
          required
        />
        <div className='button'>
          <Button className='button settings-button' onSubmit='' type='submit'>
            <span>Update Info</span>
          </Button>
        </div>
      </form>
      <form className='change-info' onSubmit=''>
        <span>Change your password</span>
        <FormInput
          type='password'
          name='passwordCurrent'
          value=''
          onChange=''
          label='current password'
          required
        />
        <FormInput
          type='password'
          name='password'
          value=''
          onChange=''
          label='new password'
          required
        />
        <FormInput
          type='password'
          name='passwordConfirm'
          value=''
          onChange=''
          label='confirm new password'
          required
        />
        <div className='button'>
          <Button className='button settings-button' onSubmit='' type='submit'>
            <span>Change Password</span>
          </Button>
        </div>
      </form>
      <div>{handleRenderDisconnectButton()}</div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isConnected: selectIsConnected,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  disconnectStart: () => dispatch(disconnectStart()),
  checkUserSession: () => dispatch(checkUserSession()),
  checkConnection: () => dispatch(checkConnection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
