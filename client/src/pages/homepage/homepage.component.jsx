import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectIsConnected,
  selectLastTokenRefresh,
  selectSpotifyError,
} from '../../redux/spotify/spotify.selectors';
import {
  checkConnection,
  refreshAuthTokenStart,
} from '../../redux/spotify/spotify.actions';

import { Grid, Button, Typography } from '@mui/material';
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
  const spotifyError = useSelector(selectSpotifyError);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  useEffect(() => {
    if (isConnected && lastTokenRefresh) {
      if (lastTokenRefresh + 60 * 60 * 1000 < Date.now() || spotifyError) {
        refreshAuthTokenStart();
      }
    }
  }, [isConnected, lastTokenRefresh, refreshAuthTokenStart, spotifyError]);

  const handleConnectToSpotifyButton = async () => {
    if (process.env.NODE_ENV === 'development') {
      window.location = 'http://localhost:8000/api/v1/spotify/login';
    } else {
      window.location = '/api/v1/spotify/login';
    }
  };

  const renderSpotifyButton = () => {
    return isConnected ? null : (
      <Button
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#ffc107',
          color: 'black',
          textTransform: 'capitalize',
          padding: '20px',
          '&:hover': {
            backgroundColor: '#ffc107',
          },
        }}
        onClick={handleConnectToSpotifyButton}
      >
        <Typography>Connect to Spotify</Typography>
      </Button>
    );
  };

  const renderSpotifyContainer = () => {
    return isConnected && lastTokenRefresh !== null ? (
      <SpotifyContainer />
    ) : null;
  };

  const firstName = currentUser.name.split(' ')[0];
  return (
    <Grid className='homepage'>
      <Grid>
        <h2>Welcome, {firstName}!</h2>
        <Grid className='button-container'>
          <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
            {renderSpotifyButton()}
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
            {renderSpotifyContainer()}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
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
