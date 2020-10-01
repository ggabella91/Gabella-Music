import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

import {
  selectCurrentUser,
  selectChangeInfoConfirm,
  selectChangeInfoError,
  selectChangePasswordConfirm,
  selectChangePasswordError,
} from '../../redux/user/user.selectors';
import {
  checkUserSession,
  changeInfoStart,
  changePasswordStart,
  deleteAccountStart,
} from '../../redux/user/user.actions';

import { selectIsConnected } from '../../redux/spotify/spotify.selectors';
import {
  checkConnection,
  disconnectStart,
} from '../../redux/spotify/spotify.actions.js';

import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import CustomModal from '../../components/modal/modal.component';

import Alert from 'react-bootstrap/Alert';

import './settings-page.styles.scss';

const SettingsPage = ({
  checkUserSession,
  currentUser,
  checkConnection,
  isConnected,
  changeInfoStart,
  changePasswordStart,
  changeInfoError,
  changeInfoConfirm,
  changePassError,
  changePassConfirm,
  disconnectStart,
  deleteAccountStart,
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

  const [showInfoAlert, setShowInfoAlert] = useState(true);
  const [statusInfo, setStatusInfo] = useState({
    success: false,
    error: false,
  });

  const [showPassAlert, setShowPassAlert] = useState(true);
  const [statusPass, setStatusPass] = useState({
    success: false,
    error: false,
  });

  const [modalShow, setModalShow] = useState(false);

  const handleSubmitInfo = async (event) => {
    event.preventDefault();

    changeInfoStart(name, email);
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();

    changePasswordStart(passwordCurrent, password, passwordConfirm);
  };

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

  useEffect(() => {
    if (changeInfoError) {
      setStatusInfo({ ...statusInfo, error: true });
    } else if (changeInfoConfirm) {
      setStatusInfo({ ...statusInfo, success: true });
    }
  }, [changeInfoError, changeInfoConfirm]);

  useEffect(() => {
    if (changePassError) {
      setStatusPass({ ...statusPass, error: true });
    } else if (changePassConfirm) {
      setStatusPass({ ...statusPass, success: true });
    }
  }, [changePassError, changePassConfirm]);

  const handleRenderAlert = (type, message) => {
    if (type === 'errorInfo' && showInfoAlert) {
      setTimeout(() => {
        setUserInfo({ name: '', email: '' });
        setStatusInfo({ success: false, error: false });
      }, 5000);
      return (
        <Alert
          variant='danger'
          onClose={() => setShowInfoAlert(false)}
          dismissible
        >
          {message}
        </Alert>
      );
    } else if (type === 'errorPass' && showPassAlert) {
      setTimeout(() => {
        setUserPassword({
          passwordCurrent: '',
          password: '',
          passwordConfirm: '',
        });
        setStatusPass({ success: false, error: false });
      }, 5000);
      return (
        <Alert
          variant='danger'
          onClose={() => setShowPassAlert(false)}
          dismissible
        >
          {message}
        </Alert>
      );
    } else if (type === 'successInfo' && showInfoAlert) {
      setTimeout(() => {
        setUserInfo({ name: '', email: '' });
        setStatusInfo({ success: false, error: false });
      }, 5000);
      return (
        <Alert
          variant='success'
          onClose={() => setShowInfoAlert(false)}
          dismissible
        >
          {message}
        </Alert>
      );
    } else if (type === 'successPass' && showPassAlert) {
      setTimeout(() => {
        setUserPassword({
          passwordCurrent: '',
          password: '',
          passwordConfirm: '',
        });
        setStatusPass({ success: false, error: false });
      }, 5000);
      return (
        <Alert
          variant='success'
          onClose={() => setShowPassAlert(false)}
          dismissible
        >
          {message}
        </Alert>
      );
    }
  };

  return (
    <div className='settings '>
      <Button
        className='button settings-button home'
        onClick={(e) => {
          e.preventDefault();
          handleBackToHomePage();
        }}
      >
        <span>Back to Home</span>
      </Button>
      <form className='change-info' onSubmit={handleSubmitInfo}>
        <span>Update your info</span>
        <FormInput
          type='text'
          name='name'
          value={name}
          onChange={handleInfoChange}
          label='name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleInfoChange}
          label='email'
          required
        />
        <div className='button'>
          <Button
            className='button settings-button'
            onSubmit={handleSubmitInfo}
            type='submit'
          >
            <span>Update Info</span>
          </Button>
        </div>
      </form>
      <div className='settings-alert'>
        {statusInfo.error
          ? handleRenderAlert('errorInfo', 'Error updating info.')
          : null}
        {statusInfo.success
          ? handleRenderAlert('successInfo', 'Info updated successfully!')
          : null}
      </div>
      <form className='change-info' onSubmit={handleSubmitPassword}>
        <span>Change your password</span>
        <FormInput
          type='password'
          name='passwordCurrent'
          value={passwordCurrent}
          onChange={handlePasswordChange}
          label='current password'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handlePasswordChange}
          label='new password'
          required
        />
        <FormInput
          type='password'
          name='passwordConfirm'
          value={passwordConfirm}
          onChange={handlePasswordChange}
          label='confirm new password'
          required
        />
        <div className='button'>
          <Button
            className='button settings-button'
            onSubmit={handleSubmitPassword}
            type='submit'
          >
            <span>Change Password</span>
          </Button>
        </div>
      </form>
      <div className='settings-alert bottom-alert'>
        {statusPass.error
          ? handleRenderAlert('errorPass', 'Error changing password.')
          : null}
        {statusPass.success
          ? handleRenderAlert('successPass', 'Password changed successfully!')
          : null}
      </div>
      <div>{handleRenderDisconnectButton()}</div>
      <div>
        <Button
          className={
            isConnected
              ? 'button settings-button'
              : 'button settings-button bottom-button'
          }
          onClick={() => setModalShow(true)}
        >
          <span>Delete Account</span>
        </Button>
      </div>
      <CustomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        header='Confirm Account Deletion'
        subheader='Are you sure you want to delete your account?'
        bodytext='This action cannot be undone.'
        actionlabel='Delete Account'
        handleConfirm={() => {
          deleteAccountStart();
        }}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isConnected: selectIsConnected,
  currentUser: selectCurrentUser,
  changeInfoConfirm: selectChangeInfoConfirm,
  changeInfoError: selectChangeInfoError,
  changePassConfirm: selectChangePasswordConfirm,
  changePassError: selectChangePasswordError,
});

const mapDispatchToProps = (dispatch) => ({
  disconnectStart: () => dispatch(disconnectStart()),
  checkUserSession: () => dispatch(checkUserSession()),
  checkConnection: () => dispatch(checkConnection()),
  changeInfoStart: (name, email) => dispatch(changeInfoStart(name, email)),
  changePasswordStart: (passwordCurrent, password, passwordConfirm) =>
    dispatch(changePasswordStart(passwordCurrent, password, passwordConfirm)),
  deleteAccountStart: () => dispatch(deleteAccountStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
