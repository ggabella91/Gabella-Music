import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
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
  lastTokenRefresh,
}) => {
  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (lastTokenRefresh !== null) {
      refreshAuthTokenStart();
    }
  }, [lastTokenRefresh]);

  const handleConnectToSpotifyButton = async () => {
    if (process.env.NODE_ENV === 'development') {
      window.location = 'http://localhost:8000/api/v1/spotify/login';
    } else {
      window.location = '/api/v1/spotify/login';
    }
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
  checkConnection: () => dispatch(checkConnection()),
  refreshAuthTokenStart: () => dispatch(refreshAuthTokenStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
