import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setCurrentUser, logOutUser } from '../../redux/user/user.actions';

import Button from '../../components/button/button.component';

import axios from 'axios';
import './homepage.styles.scss';
axios.defaults.withCredentials = true;

class HomePage extends React.Component {
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

  handleConnectToSpotifyButton = () =>
    (window.location = 'http://localhost:8000/api/v1/spotify/login');

  handleClickSpotifyButton = async (e) => {
    e.preventDefault();

    await this.callSpotifyApi('me/top/artists?time_range=long_term');
  };

  handleLogout = async () => {
    const { logOutUser } = this.props;

    try {
      const res = await axios.get('http://localhost:8000/api/v1/users/logout');

      if (res.status === 200) {
        logOutUser();
      }
    } catch (err) {
      console.log('Error Logging Out.');
    }
  };

  render() {
    return (
      <div className='homepage'>
        <div>
          <div className='button-container'>
            <div className='button'>
              <Button
                onClick={this.handleConnectToSpotifyButton}
                className='button submit-button'
              >
                <span>Connect to Spotify</span>
              </Button>
            </div>
            <div className='button' onClick={this.handleClickSpotifyButton}>
              <Button className='button submit-button'>
                <span>Get Spotify Data</span>
              </Button>
            </div>
            <div className='button' onClick={this.handleLogout}>
              <Button className='button submit-button'>
                <span>Log Out</span>
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
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  logOutUser: () => dispatch(logOutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
