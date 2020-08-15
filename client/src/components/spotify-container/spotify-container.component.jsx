import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpotifyElement from '../spotify-element/spotify-element.component';

import { selectTopArtists } from '../../redux/spotify/spotify.selectors';
import {
  fetchTopArtistsStart,
  fetchTopArtistsSuccess,
} from '../../redux/spotify/spotify.actions';

import './spotify-container.styles.scss';

const SpotifyContainer = ({ fetchTopArtistsStart, topArtists }) => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchTopArtistsStart('me/top/artists?time_range=long_term');
  }, []);

  useEffect(() => {
    if (topArtists.data) {
      if (topArtists.data.items.length > 0) {
        setArtists(topArtists.data.items);
        console.log(artists);
      }
    }
  });

  return (
    <div>
      {artists
        ? artists.map((artist, idx) => (
            <SpotifyElement
              className='spotify-element'
              key={idx}
              item={artist}
            />
          ))
        : null}
    </div>
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
