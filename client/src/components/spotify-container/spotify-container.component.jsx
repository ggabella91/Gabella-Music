import React, { useState } from 'react';
//import { connect } from 'react-redux';

import SpotifyElement from '../spotify-element/spotify-element.component';

//import { fetchTopArtistsStart } from '../../redux/spotify/spotify.actions';

import './spotify-container.styles.scss';

const SpotifyContainer = () => {
  return <SpotifyElement className='spotify-element' />;
};

export default SpotifyContainer;
