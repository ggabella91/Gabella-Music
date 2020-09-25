import React, { useEffect } from 'react';
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
      <Button className='button settings-button' onClick={disconnectStart}>
        <span>Disconnect From Spotify</span>
      </Button>
    ) : null;

  const handleBackToHomePage = () => {
    history.push('/me');
  };

  return (
    <div className='settings'>
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
          <Button className='button submit-button' onSubmit='' type='submit'>
            Change Name
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
