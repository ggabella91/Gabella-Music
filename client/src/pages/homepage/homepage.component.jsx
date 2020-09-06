import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import {
  selectIsConnected,
  selectLastTokenRefresh,
} from '../../redux/spotify/spotify.selectors';
import {
  checkConnection,
  refreshAuthTokenStart,
} from '../../redux/spotify/spotify.actions';

import Button from '../../components/button/button.component';
import SpotifyContainer from '../../components/spotify-container/spotify-container.component';

import axios from 'axios';
import './homepage.styles.scss';
axios.defaults.withCredentials = true;

const HomePage = ({
  currentUser,
  isConnected,
  checkConnection,
  refreshAuthTokenStart,
  signOutStart,
  lastTokenRefresh,
}) => {
  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (lastTokenRefresh !== null) {
      if (
        Date.parse(lastTokenRefresh) + 60 * 60 * 1000 <
        new Date(Date.now()).getTime()
      ) {
        refreshAuthTokenStart();
      }
    }
  }, [isConnected]);

  const handleConnectToSpotifyButton = async () => {
    window.location = 'http://localhost:8000/api/v1/spotify/login';
  };

  const handleRenderSpotifyButton = () => {
    return isConnected ? null : (
      <Button
        onClick={handleConnectToSpotifyButton}
        className='button submit-button'
      >
        <span>Connect to Spotify</span>
      </Button>
    );
  };

  const handleRenderSpotifyContainer = () => {
    return isConnected && lastTokenRefresh !== null ? (
      <SpotifyContainer />
    ) : null;
  };

  const firstName = currentUser.name.split(' ')[0];
  return (
    <div className='homepage'>
      <div>
        <h2>Welcome, {firstName}!</h2>
        <div className='button-container'>
          <div className='button'>{handleRenderSpotifyButton()}</div>
          <div className='spotify'>{handleRenderSpotifyContainer()}</div>
          <div className='button'>
            <Button className='button submit-button' onClick={signOutStart}>
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isConnected: selectIsConnected,
  lastTokenRefresh: selectLastTokenRefresh,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  checkConnection: () => dispatch(checkConnection()),
  refreshAuthTokenStart: () => dispatch(refreshAuthTokenStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
