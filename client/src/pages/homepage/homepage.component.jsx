import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { selectIsConnected } from '../../redux/spotify/spotify.selectors';
import { checkConnection } from '../../redux/spotify/spotify.actions';

import Button from '../../components/button/button.component';
import SpotifyContainer from '../../components/spotify-container/spotify-container.component';

import axios from 'axios';
import './homepage.styles.scss';
axios.defaults.withCredentials = true;

const HomePage = ({
  currentUser,
  isConnected,
  checkConnection,
  signOutStart,
}) => {
  useEffect(() => {
    checkConnection();
  }, []);

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
    return isConnected ? <SpotifyContainer /> : null;
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
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  checkConnection: () => dispatch(checkConnection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
