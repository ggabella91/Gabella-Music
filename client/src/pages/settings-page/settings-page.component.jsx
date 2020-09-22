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
      <Button className='button disconnect-button' onClick={disconnectStart}>
        <span>Disconnect From Spotify</span>
      </Button>
    ) : null;

  return (
    <div className='settings'>
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
