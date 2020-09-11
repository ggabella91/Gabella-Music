import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Dropdown from 'react-bootstrap/Dropdown';
import SpotifyElement from '../spotify-element/spotify-element.component';

import {
  selectIsConnected,
  selectPhoto,
  selectLastTokenRefresh,
  selectTopArtistsLongTerm,
  selectTopArtistsMediumTerm,
  selectTopArtistsShortTerm,
  selectTopTracks,
} from '../../redux/spotify/spotify.selectors';
import {
  fetchTopArtistsLongTermStart,
  fetchTopArtistsMediumTermStart,
  fetchTopArtistsShortTermStart,
  fetchTopTracksStart,
} from '../../redux/spotify/spotify.actions';

import './spotify-container.styles.scss';

const SpotifyContainer = ({
  isConnected,
  photo,
  lastTokenRefresh,
  fetchTopArtistsLongTermStart,
  fetchTopArtistsMediumTermStart,
  fetchTopArtistsShortTermStart,
  fetchTopTracksStart,
  topArtistsLongTerm,
  topArtistsMediumTerm,
  topArtistsShortTerm,
  topTracks,
}) => {
  const [userPhoto, setUserPhoto] = useState('');
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artistsTimeRange, setArtistsTimeRange] = useState('long-term');
  const [tracksTimeRange, setTracksTimeRange] = useState('long-term');

  useEffect(() => {
    if (isConnected && lastTokenRefresh !== null) {
      if (
        Date.parse(lastTokenRefresh) + 60 * 60 * 1000 >
        new Date(Date.now()).getTime()
      ) {
        fetchTopArtistsLongTermStart();
        fetchTopArtistsMediumTermStart();
        fetchTopArtistsShortTermStart();
      }
    }
  }, []);

  useEffect(() => {
    if (isConnected && lastTokenRefresh !== null) {
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
  }, [photo]);

  useEffect(() => {
    setArtistsTimeRange(artistsTimeRange);
  }, [artistsTimeRange]);

  useEffect(() => {
    if (artistsTimeRange === 'long-term') {
      if (topArtistsLongTerm.data) {
        if (topArtistsLongTerm.data.items.length > 0) {
          setArtists(topArtistsLongTerm.data.items);
        }
      }
    } else if (artistsTimeRange === 'medium-term') {
      if (topArtistsMediumTerm.data) {
        if (topArtistsMediumTerm.data.items.length > 0) {
          setArtists(topArtistsMediumTerm.data.items);
        }
      }
    } else if (artistsTimeRange === 'short-term') {
      if (topArtistsShortTerm.data) {
        if (topArtistsShortTerm.data.items.length > 0) {
          setArtists(topArtistsShortTerm.data.items);
        }
      }
    }
  }, [
    topArtistsLongTerm.data,
    topArtistsMediumTerm.data,
    topArtistsShortTerm.data,
  ]);

  useEffect(() => {
    if (topTracks.data) {
      if (topTracks.data.items.length > 0) {
        setTracks(topTracks.data.items);
      }
    }
  }, [topTracks.data]);

  return (
    <div>
      <div>
        {userPhoto ? (
          <img className='user-photo' src={userPhoto} alt='' />
        ) : null}
      </div>
      <h2 className='top-artists'>Your Top Artists On Spotify</h2>
      <div className='spotify-container'>
        <h4>{artistsTimeRange}</h4>
        <div className='dropdown-container'>
          <Dropdown>
            <Dropdown.Toggle as='dropdown' id='dropdown-artists'>
              Time Range
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                eventKey='long-term'
                onSelect={(eventKey) => {
                  console.log('long-term');
                  setArtistsTimeRange(eventKey);
                }}
              >
                Long-term
              </Dropdown.Item>
              <Dropdown.Item
                eventKey='medium-term'
                onSelect={(eventKey) => {
                  setArtistsTimeRange(eventKey);
                }}
              >
                Medium-term
              </Dropdown.Item>
              <Dropdown.Item
                eventKey='short-term'
                onSelect={(eventKey) => {
                  setArtistsTimeRange(eventKey);
                }}
              >
                Short-term
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
        <h4>{tracksTimeRange}</h4>

        <div className='dropdown-container'>
          <Dropdown>
            <Dropdown.Toggle as='dropdown' id='dropdown-tracks'>
              Time Range
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                value='long-term'
                onClick={() => {
                  setTracksTimeRange('long-term');
                }}
              >
                Long-term
              </Dropdown.Item>
              <Dropdown.Item
                value='medium-term'
                onClick={() => {
                  setTracksTimeRange('medium-term');
                }}
              >
                Medium-term
              </Dropdown.Item>
              <Dropdown.Item
                value='short-term'
                onClick={() => {
                  setTracksTimeRange('short-term');
                }}
              >
                Short-term
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
  isConnected: selectIsConnected,
  photo: selectPhoto,
  lastTokenRefresh: selectLastTokenRefresh,
  topArtistsLongTerm: selectTopArtistsLongTerm,
  topArtistsMediumTerm: selectTopArtistsMediumTerm,
  topArtistsShortTerm: selectTopArtistsShortTerm,
  topTracks: selectTopTracks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopArtistsLongTermStart: () => dispatch(fetchTopArtistsLongTermStart()),
  fetchTopArtistsMediumTermStart: () =>
    dispatch(fetchTopArtistsMediumTermStart()),
  fetchTopArtistsShortTermStart: () =>
    dispatch(fetchTopArtistsShortTermStart()),
  fetchTopTracksStart: () => dispatch(fetchTopTracksStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyContainer);
