import React from 'react';
import axios from 'axios';
import './homepage.styles.scss';
axios.defaults.withCredentials = true;

export const callSpotifyApi = async (endpoint) => {
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

export const handleClickSpotifyButton = async (e) => {
  e.preventDefault();

  const data = await callSpotifyApi('me/top/artists?time_range=long_term');
};

export const HomePage = () => (
  <div className='homepage'>
    <div>
      <div>
        <h1>Gabella Music</h1>
        <br />
        <p>Created by Giuliano Gabella</p>
        <div className='button'>
          <a
            className='button spotify-button'
            href='http://localhost:8000/api/v1/spotify/login'
          >
            Connect to Spotify
          </a>
        </div>
        <div className='button' onClick={handleClickSpotifyButton}>
          <button className='button spotify-button'>Get Spotify Data</button>
        </div>
      </div>
    </div>
  </div>
);
