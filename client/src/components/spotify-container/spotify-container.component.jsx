import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpotifyElement from '../spotify-element/spotify-element.component';

import {
  selectPhoto,
  selectLastTokenRefresh,
  selectTopArtists,
  selectTopTracks,
} from '../../redux/spotify/spotify.selectors';
import {
  fetchTopArtistsStart,
  fetchTopTracksStart,
} from '../../redux/spotify/spotify.actions';

import './spotify-container.styles.scss';

const SpotifyContainer = ({
  photo,
  lastTokenRefresh,
  fetchTopArtistsStart,
  fetchTopTracksStart,
  topArtists,
  topTracks,
}) => {
  const [userPhoto, setUserPhoto] = useState('');
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (lastTokenRefresh !== null) {
      if (
        Date.parse(lastTokenRefresh) + 60 * 60 * 1000 >
        new Date(Date.now()).getTime()
      ) {
        console.log('Got here');
        fetchTopArtistsStart();
      }
    }
  }, []);

  useEffect(() => {
    if (lastTokenRefresh !== null) {
      if (
        Date.parse(lastTokenRefresh) + 60 * 60 * 1000 >
        new Date(Date.now()).getTime()
      ) {
        fetchTopTracksStart();
      }
    }
  }, []);

  useEffect(() => {
    if (photo) {
      setUserPhoto(photo);
    }
  });

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
      <div>
        {userPhoto ? <img className='user-photo' src={userPhoto} /> : null}
      </div>
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
  photo: selectPhoto,
  lastTokenRefresh: selectLastTokenRefresh,
  topArtists: selectTopArtists,
  topTracks: selectTopTracks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopArtistsStart: () => dispatch(fetchTopArtistsStart()),
  fetchTopTracksStart: () => dispatch(fetchTopTracksStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyContainer);
