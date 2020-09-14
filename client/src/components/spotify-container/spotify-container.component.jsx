import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Dropdown from 'react-bootstrap/Dropdown';
import SpotifyElement from '../spotify-element/spotify-element.component';
import withSpinner from '../with-spinner/with-spinner.component';

import {
  selectIsConnected,
  selectUserInfo,
  selectLastTokenRefresh,
  selectTopArtistsLongTerm,
  selectTopArtistsMediumTerm,
  selectTopArtistsShortTerm,
  selectTopTracksLongTerm,
  selectTopTracksMediumTerm,
  selectTopTracksShortTerm,
} from '../../redux/spotify/spotify.selectors';
import {
  fetchUserInfoStart,
  fetchTopArtistsLongTermStart,
  fetchTopArtistsMediumTermStart,
  fetchTopArtistsShortTermStart,
  fetchTopTracksLongTermStart,
  fetchTopTracksMediumTermStart,
  fetchTopTracksShortTermStart,
} from '../../redux/spotify/spotify.actions';

import './spotify-container.styles.scss';

const SpotifyContainer = ({
  isConnected,
  userInfo,
  lastTokenRefresh,
  fetchUserInfoStart,
  fetchTopArtistsLongTermStart,
  fetchTopArtistsMediumTermStart,
  fetchTopArtistsShortTermStart,
  fetchTopTracksLongTermStart,
  fetchTopTracksMediumTermStart,
  fetchTopTracksShortTermStart,
  topArtistsLongTerm,
  topArtistsMediumTerm,
  topArtistsShortTerm,
  topTracksLongTerm,
  topTracksMediumTerm,
  topTracksShortTerm,
}) => {
  const [userPhoto, setUserPhoto] = useState('');
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artistsTimeRange, setArtistsTimeRange] = useState('');
  const [tracksTimeRange, setTracksTimeRange] = useState('');

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
        fetchUserInfoStart();
        fetchTopTracksLongTermStart();
        fetchTopTracksMediumTermStart();
        fetchTopTracksShortTermStart();
      }
    }
  }, []);

  useEffect(() => {
    if (userInfo.data) {
      if (userInfo.data.images.length) {
        setUserPhoto(userInfo.data.images[0].url);
      }
    }
  }, [userInfo]);

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
  }, [artistsTimeRange]);

  useEffect(() => {
    if (tracksTimeRange === 'long-term') {
      if (topTracksLongTerm.data) {
        if (topTracksLongTerm.data.items.length > 0) {
          setTracks(topTracksLongTerm.data.items);
        }
      }
    } else if (tracksTimeRange === 'medium-term') {
      if (topTracksMediumTerm.data) {
        if (topTracksMediumTerm.data.items.length > 0) {
          setTracks(topTracksMediumTerm.data.items);
        }
      }
    } else if (tracksTimeRange === 'short-term') {
      if (topTracksShortTerm.data) {
        if (topTracksShortTerm.data.items.length > 0) {
          setTracks(topTracksShortTerm.data.items);
        }
      }
    }
  }, [tracksTimeRange]);

  return (
    <div>
      <div>
        {userPhoto ? (
          <img className='user-photo' src={userPhoto} alt='' />
        ) : null}
      </div>
      <h2 className='top-artists'>Your Top Artists On Spotify</h2>
      <div className='spotify-container'>
        <h4>Time Range: {artistsTimeRange}</h4>
        <div className='dropdown-container'>
          <Dropdown>
            <Dropdown.Toggle as='dropdown' id='dropdown-artists'>
              Select Time Range
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                value='long-term'
                onClick={() => {
                  setArtistsTimeRange('long-term');
                }}
              >
                Long-term
              </Dropdown.Item>
              <Dropdown.Item
                value='medium-term'
                onClick={() => {
                  setArtistsTimeRange('medium-term');
                }}
              >
                Medium-term
              </Dropdown.Item>
              <Dropdown.Item
                value='short-term'
                onClick={() => {
                  setArtistsTimeRange('short-term');
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
        <h4>Time Range: {tracksTimeRange}</h4>

        <div className='dropdown-container'>
          <Dropdown>
            <Dropdown.Toggle as='dropdown' id='dropdown-tracks'>
              Select Time Range
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
  userInfo: selectUserInfo,
  lastTokenRefresh: selectLastTokenRefresh,
  topArtistsLongTerm: selectTopArtistsLongTerm,
  topArtistsMediumTerm: selectTopArtistsMediumTerm,
  topArtistsShortTerm: selectTopArtistsShortTerm,
  topTracksLongTerm: selectTopTracksLongTerm,
  topTracksMediumTerm: selectTopTracksMediumTerm,
  topTracksShortTerm: selectTopTracksShortTerm,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserInfoStart: () => dispatch(fetchUserInfoStart()),
  fetchTopArtistsLongTermStart: () => dispatch(fetchTopArtistsLongTermStart()),
  fetchTopArtistsMediumTermStart: () =>
    dispatch(fetchTopArtistsMediumTermStart()),
  fetchTopArtistsShortTermStart: () =>
    dispatch(fetchTopArtistsShortTermStart()),
  fetchTopTracksLongTermStart: () => dispatch(fetchTopTracksLongTermStart()),
  fetchTopTracksMediumTermStart: () =>
    dispatch(fetchTopTracksMediumTermStart()),
  fetchTopTracksShortTermStart: () => dispatch(fetchTopTracksShortTermStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyContainer);
