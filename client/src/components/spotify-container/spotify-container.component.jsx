import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpotifyElement from '../spotify-element/spotify-element.component';

import { selectTopArtists } from '../../redux/spotify/spotify.selectors';
import { fetchTopArtistsStart } from '../../redux/spotify/spotify.actions';

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
    <SpotifyElement className='spotify-element'>
      <div>
        {artists.artistArray
          ? artists.artistArray.map((artist, idx) => (
              <div>{artist.idx.name}</div>
            ))
          : null}
      </div>
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
