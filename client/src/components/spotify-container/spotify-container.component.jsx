import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpotifyElement from '../spotify-element/spotify-element.component';

import { selectTopArtists } from '../../redux/spotify/spotify.selectors';
import { fetchTopArtistsStart } from '../../redux/spotify/spotify.actions';

import './spotify-container.styles.scss';

const SpotifyContainer = ({ fetchTopArtistsStart, topArtists }) => {
  const [artists, setArtists] = useState({ artistArray: [] });

  useEffect(() => {
    fetchTopArtistsStart('me/top/artists?time_range=long_term');
  }, []);

  useEffect(() => {
    if (topArtists !== null) {
      setArtists(topArtists.data.items);
      console.log(artists);
    }
  });

  let artistElementArray = [];

  const handleBuildTopArtistsElements = () => {
    if (artists !== null) {
      for (let i = 0; i < artists.length; i += 1) {
        artistElementArray.push(<SpotifyElement key={i} item={artists[i]} />);
      }
    }
  };

  handleBuildTopArtistsElements();
  console.log(artistElementArray[0]);
  return (
    <SpotifyElement className='spotify-element'>
      <div>{artistElementArray[0]}</div>
    </SpotifyElement>
  );
};

const mapStateToProps = createStructuredSelector({
  topArtists: selectTopArtists,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopArtistsStart: (topArtistsEndpoint) =>
    dispatch(fetchTopArtistsStart(topArtistsEndpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyContainer);
