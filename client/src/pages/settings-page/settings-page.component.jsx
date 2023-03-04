import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

import {
  selectChangeInfoConfirm,
  selectChangeInfoError,
  selectChangePasswordConfirm,
  selectChangePasswordError,
} from '../../redux/user/user.selectors';
import {
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
import CustomModal from '../../components/modal/modal.component';

import Alert from 'react-bootstrap/Alert';

import { Button, Grid, Typography } from '@mui/material';

import './settings-page.styles.scss';

const settingsButtonStyles = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#ffc107',
  color: 'black',
  textTransform: 'capitalize',
  padding: '20px',
  '&:hover': {
    backgroundColor: '#ffc107',
  },
};

const settingsAlertStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '350px',
  marginTop: '20px',
};

const SettingsPage = ({
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

  let history = useHistory();

  useEffect(() => {
    if (isConnected) {
      checkConnection();
    }
  }, [isConnected]);

  const handleRenderDisconnectButton = () =>
    isConnected ? (
      <Button
        sx={{
          ...settingsButtonStyles,
          minWidth: '240px',
          marginTop: '120px',
          marginBottom: '20px',
        }}
        onClick={disconnectStart}
      >
        <Typography>Disconnect From Spotify</Typography>
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
    <Grid
      sx={{
        width: '2vw',
        minWidth: '200px',
        maxWidth: '250px',
        paddingTop: '0px',
        height: '1350px',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '60px',
        marginLeft: '50%',
        transform: 'translate(-50%)',
      }}
    >
      <Button
        sx={{ ...settingsButtonStyles, width: '180px' }}
        onClick={(e) => {
          e.preventDefault();
          handleBackToHomePage();
        }}
      >
        <Typography>Back to Home</Typography>
      </Button>
      <form className='change-info' onSubmit={handleSubmitInfo}>
        <Typography>Update your info</Typography>
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
        <Grid sx={{ display: 'flex' }}>
          <Button
            className='button settings-button'
            sx={{ ...settingsButtonStyles, width: '220px', height: '60px' }}
            onSubmit={handleSubmitInfo}
          >
            <Typography>Update Info</Typography>
          </Button>
        </Grid>
      </form>
      <Grid sx={settingsAlertStyles}>
        {statusInfo.error
          ? handleRenderAlert('errorInfo', 'Error updating info.')
          : null}
        {statusInfo.success
          ? handleRenderAlert('successInfo', 'Info updated successfully!')
          : null}
      </Grid>
      <form className='change-info' onSubmit={handleSubmitPassword}>
        <Typography>Change your password</Typography>
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
        <Grid sx={{ display: 'flex' }}>
          <Button
            sx={{ ...settingsButtonStyles, width: '220px' }}
            onSubmit={handleSubmitPassword}
          >
            <Typography>Change Password</Typography>
          </Button>
        </Grid>
      </form>
      <Grid sx={{ ...settingsAlertStyles, marginTop: '100px' }}>
        {statusPass.error
          ? handleRenderAlert('errorPass', 'Error changing password.')
          : null}
        {statusPass.success
          ? handleRenderAlert('successPass', 'Password changed successfully!')
          : null}
      </Grid>
      <Grid>{handleRenderDisconnectButton()}</Grid>
      <Grid>
        <Button
          sx={settingsButtonStyles}
          style={!isConnected ? { marginTop: '120px' } : {}}
          onClick={() => setModalShow(true)}
        >
          <Typography>Delete Account</Typography>
        </Button>
      </Grid>
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
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  isConnected: selectIsConnected,
  changeInfoConfirm: selectChangeInfoConfirm,
  changeInfoError: selectChangeInfoError,
  changePassConfirm: selectChangePasswordConfirm,
  changePassError: selectChangePasswordError,
});

const mapDispatchToProps = (dispatch) => ({
  disconnectStart: () => dispatch(disconnectStart()),
  checkConnection: () => dispatch(checkConnection()),
  changeInfoStart: (name, email) => dispatch(changeInfoStart(name, email)),
  changePasswordStart: (passwordCurrent, password, passwordConfirm) =>
    dispatch(changePasswordStart(passwordCurrent, password, passwordConfirm)),
  deleteAccountStart: () => dispatch(deleteAccountStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
