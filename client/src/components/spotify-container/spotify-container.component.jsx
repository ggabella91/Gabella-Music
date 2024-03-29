import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpotifyElement from '../spotify-element/spotify-element.component';
import SelectInput from '../select-input/select-input';

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

const timeRangeOptions = [
  { value: 'long-term', displayValue: 'Long-Term' },
  { value: 'medium-term', displayValue: 'Medium-Term' },
  { value: 'short-term', displayValue: 'Short-Term' },
];

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
    if (
      isConnected &&
      lastTokenRefresh &&
      lastTokenRefresh + 60 * 60 * 1000 > Date.now()
    ) {
      fetchTopArtistsLongTermStart();
      fetchTopArtistsMediumTermStart();
      fetchTopArtistsShortTermStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, lastTokenRefresh]);

  useEffect(() => {
    if (
      isConnected &&
      lastTokenRefresh &&
      lastTokenRefresh + 60 * 60 * 1000 > Date.now()
    ) {
      fetchUserInfoStart();
      fetchTopTracksLongTermStart();
      fetchTopTracksMediumTermStart();
      fetchTopTracksShortTermStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, lastTokenRefresh]);

  useEffect(() => {
    if (userInfo.data) {
      if (userInfo.data.images.length) {
        setUserPhoto(userInfo.data.images[0].url);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (artistsTimeRange === 'long-term') {
      if (topArtistsLongTerm.data && topArtistsLongTerm.data.items.length) {
        setArtists(topArtistsLongTerm.data.items);
      }
    } else if (artistsTimeRange === 'medium-term') {
      if (topArtistsMediumTerm.data && topArtistsMediumTerm.data.items.length) {
        setArtists(topArtistsMediumTerm.data.items);
      }
    } else if (artistsTimeRange === 'short-term') {
      if (topArtistsShortTerm.data && topArtistsShortTerm.data.items.length) {
        setArtists(topArtistsShortTerm.data.items);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistsTimeRange]);

  useEffect(() => {
    if (tracksTimeRange === 'long-term') {
      if (topTracksLongTerm.data && topTracksLongTerm.data.items.length) {
        setTracks(topTracksLongTerm.data.items);
      }
    } else if (tracksTimeRange === 'medium-term') {
      if (topTracksMediumTerm.data && topTracksMediumTerm.data.items.length) {
        setTracks(topTracksMediumTerm.data.items);
      }
    } else if (tracksTimeRange === 'short-term') {
      if (topTracksShortTerm.data && topTracksShortTerm.data.items.length) {
        setTracks(topTracksShortTerm.data.items);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <SelectInput
            options={timeRangeOptions}
            selectedValue={artistsTimeRange}
            setSelectedValue={setArtistsTimeRange}
            defaultValue='Select Time Range'
          />
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
          <SelectInput
            options={timeRangeOptions}
            selectedValue={tracksTimeRange}
            setSelectedValue={setTracksTimeRange}
            defaultValue='Select Time Range'
          />
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
