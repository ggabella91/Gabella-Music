import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setCurrentUser, signOutStart } from '../../redux/user/user.actions';
import { selectIsConnected } from '../../redux/spotify/spotify.selectors';
import { markConnected } from '../../redux/spotify/spotify.actions';

import Button from '../../components/button/button.component';

import axios from 'axios';
import './homepage.styles.scss';
axios.defaults.withCredentials = true;

class HomePage extends React.Component {
  componentDidMount = async () => {
    const { markConnected } = this.props;
    try {
      const isConnectedToSpotify = await axios.get(
        'http://localhost:8000/api/v1/users/isConnectedToSpotify'
      );

      if (isConnectedToSpotify.status === 200) {
        markConnected();
        console.log('User is connected to Spotify!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  callSpotifyApi = async (endpoint) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/spotify/getEndpointData',

        {
          endpoint,
          withCredentials: true,
        }
      );

      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log('ERROR');
    }
  };

  handleConnectToSpotifyButton = async () => {
    window.location = 'http://localhost:8000/api/v1/spotify/login';
  };

  handleRenderSpotifyButton = () => {
    const { isConnected } = this.props;

    return isConnected ? null : (
      <Button
        onClick={this.handleConnectToSpotifyButton}
        className='button submit-button'
      >
        <span>Connect to Spotify</span>
      </Button>
    );
  };

  handleClickSpotifyButton = async (e) => {
    e.preventDefault();

    await this.callSpotifyApi('me/top/artists?time_range=long_term');
  };

  render() {
    const firstName = this.props.currentUser.name.split(' ')[0];
    const { signOutStart } = this.props;
    return (
      <div className='homepage'>
        <div>
          <h2>Welcome, {firstName}!</h2>
          <div className='button-container'>
            <div className='button'>{this.handleRenderSpotifyButton()}</div>
            <div className='button'>
              <Button
                className='button submit-button'
                onClick={this.handleClickSpotifyButton}
              >
                <span>Get Spotify Data</span>
              </Button>
            </div>
            <div className='button'>
              <Button className='button submit-button' onClick={signOutStart}>
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isConnected: selectIsConnected,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  signOutStart: () => dispatch(signOutStart()),
  markConnected: (spotifyState) => dispatch(markConnected(spotifyState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
