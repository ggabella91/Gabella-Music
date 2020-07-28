import React from 'react';
import './App.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

//import queryString from 'query-string';

class App extends React.Component {
  state = {
    user: {},
    playlists: [],
    filterString: '',
  };

  componentDidMount = async () => {
    // let parsedQueryString = queryString.parse(window.location.search);
    // let accessToken = parsedQueryString.access_token;
    // let refreshToken = parsedQueryString.refresh_token;
    // try {
    //   const data = await this.callSpotifyApi('/me');
    //   const playlists = await this.callSpotifyApi('me/playlists');
    //   console.log(playlists);
    //   this.setState({ user: { name: data.display_name } });
    //   if (playlists) {
    //     this.setState({
    //       playlists: playlists.items.map((item) => ({
    //         name: item.name,
    //       })),
    //     });
    //   }
    // } catch (err) {
    //   console.log(err.message);
    // }
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

  handleClickSpotifyButton = async (e) => {
    e.preventDefault();

    const data = await this.callSpotifyApi(
      'me/top/artists?time_range=long_term'
    );

    this.setState({ data });
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          {this.state.user.name ? (
            <div>
              <div>
                <h2>Welcome, {this.state.user.name.split(' ')[0]}!</h2>
              </div>
              <div>
                <h4>{this.state.user.name.split(' ')[0]}'s Playlists:</h4>
              </div>
              <br />
              <div>
                {this.state.playlists.map((playlist) => (
                  <div>{playlist.name}</div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h1>Gabella Music</h1>
              <br />
              <p>Created by Giuliano Gabella</p>
              <div className='button'>
                <a
                  className='button spotify-button'
                  href='http://localhost:8000/api/v1/spotify/login'
                >
                  Connect to Spotify
                </a>
              </div>
              <div className='button' onClick={this.handleClickSpotifyButton}>
                <button className='button spotify-button'>
                  Get Spotify Data
                </button>
              </div>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
