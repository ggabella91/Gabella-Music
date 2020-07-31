import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import axios from 'axios';
import './homepage.styles.scss';
axios.defaults.withCredentials = true;

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

const handleClickSpotifyButton = async (e) => {
  e.preventDefault();

  await callSpotifyApi('me/top/artists?time_range=long_term');
};

const HomePage = () => (
  <div className='homepage'>
    <div>
      <div>
        <div className='button-container'>
          <div className='button'>
            <button
              onClick={() =>
                (window.location = 'http://localhost:8000/api/v1/spotify/login')
              }
              className='button spotify-button'
            >
              <span>Connect to Spotify</span>
            </button>
          </div>
          <div className='button' onClick={handleClickSpotifyButton}>
            <button className='button spotify-button'>
              <span>Get Spotify Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePage);
