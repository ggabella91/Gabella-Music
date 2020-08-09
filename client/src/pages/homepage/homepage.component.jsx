import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { selectIsConnected } from '../../redux/spotify/spotify.selectors';
import { checkConnection } from '../../redux/spotify/spotify.actions';

import Button from '../../components/button/button.component';

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

  const callSpotifyApi = async (endpoint) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/spotify/getEndpointData',

        {
          endpoint,
          withCredentials: true,
        }
      );

      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log('ERROR');
    }
  };

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

  const handleClickSpotifyButton = async (e) => {
    e.preventDefault();

    await callSpotifyApi('me/top/artists?time_range=long_term');
  };

  const firstName = currentUser.name.split(' ')[0];
  return (
    <div className='homepage'>
      <div>
        <h2>Welcome, {firstName}!</h2>
        <div className='button-container'>
          <div className='button'>{handleRenderSpotifyButton()}</div>
          <div className='button'>
            <Button
              className='button submit-button'
              onClick={handleClickSpotifyButton}
            >
              <span>Get Spotify Data</span>
            </Button>
          </div>
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
