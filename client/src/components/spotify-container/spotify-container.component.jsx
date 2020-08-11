import React, { useState } from 'react';

import SpotifyElement from '../spotify-element/spotify-element.component';

import './spotify-container.styles.scss';

import axios from 'axios';
axios.defaults.withCredentials = true;

const SpotifyContainer = () => {
  const callSpotifyApi = async (endpoint) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/spotify/getEndpointData',

        {
          endpoint,
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err) {
      console.log('ERROR');
    }
  };

  let artists = [];
  const grabSpotifyData = async () => {
    const res = await callSpotifyApi('me/top/artists?time_range=long_term');
    artists = res.data.items.map((obj) => obj.name);
  };

  grabSpotifyData();

  const renderSpotifyData = (artists) => {
    artists.forEach((name) => console.log(name));
    return artists[0];
  };

  return (
    <SpotifyElement className='spotify-element'>{artists[0]}</SpotifyElement>
  );
};

export default SpotifyContainer;
