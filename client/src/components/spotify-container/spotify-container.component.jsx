import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpotifyElement from '../spotify-element/spotify-element.component';

import {
  selectTopArtists,
  selectTopTracks,
} from '../../redux/spotify/spotify.selectors';
import {
  fetchTopArtistsStart,
  fetchTopTracksStart,
} from '../../redux/spotify/spotify.actions';

import './spotify-container.styles.scss';

const SpotifyContainer = ({
  fetchTopArtistsStart,
  fetchTopTracksStart,
  topArtists,
  topTracks,
}) => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchTopArtistsStart();
  }, []);

  useEffect(() => {
    fetchTopTracksStart();
  }, []);

  useEffect(() => {
    if (topArtists.data) {
      if (topArtists.data.items.length > 0) {
        setArtists(topArtists.data.items);
      }
    }
  });

  useEffect(() => {
    if (topTracks.data) {
      if (topTracks.data.items.length > 0) {
        setTracks(topTracks.data.items);
      }
    }
  });

  return (
    <div>
      <h2 className='top-artists'>Your Top Artists On Spotify</h2>
      <div className='spotify-container'>
        {artists
          ? artists.map((artist, idx) => (
              <SpotifyElement
                className='spotify-element'
                type='artist'
                key={idx}
                item={artist}
              />
            ))
          : null}
      </div>
      <h2 className='top-artists'>Your Top Spotify Tracks</h2>
      <div className='spotify-container'>
        {tracks
          ? tracks.map((track, idx) => (
              <SpotifyElement
                className='spotify-element'
                type='track'
                key={idx}
                item={track}
              />
            ))
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  topArtists: selectTopArtists,
  topTracks: selectTopTracks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopArtistsStart: () => dispatch(fetchTopArtistsStart()),
  fetchTopTracksStart: () => dispatch(fetchTopTracksStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyContainer);
