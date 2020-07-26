import React from 'react';
import './App.css';
import axios from 'axios';
import queryString from 'query-string';

class App extends React.Component {
  state = {
    user: {},
    playlists: [],
    filterString: '',
  };

  componentDidMount = async () => {
    let parsedQueryString = queryString.parse(window.location.search);
    let accessToken = parsedQueryString.access_token;
    let refreshToken = parsedQueryString.refresh_token;

    try {
      const data = await this.callSpotifyApi(
        'https://api.spotify.com/v1/me',
        accessToken,
        refreshToken
      );
      const playlists = await this.callSpotifyApi(
        'https://api.spotify.com/v1/me/playlists',
        accessToken,
        refreshToken
      );
      console.log(playlists);
      this.setState({ user: { name: data.display_name } });
      if (playlists) {
        this.setState({
          playlists: playlists.items.map((item) => ({
            name: item.name,
          })),
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  callSpotifyApi = async (endpointUri, accessToken, refreshToken) => {
    try {
      const response = await axios.get(endpointUri, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  handleClickSpotifyButton = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      'http://localhost:8000/api/v1/spotify/login'
    );

    const data = response.data;

    this.setState({ data });
  };

  render() {
    let spotifyDataToRender =
      this.state.user.name && this.state.playlists
        ? this.state.playlists.filter((playlist) =>
            playlist.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase())
          )
        : [];

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
                  /*onClick={this.handleClickSpotifyButton}*/
                >
                  Connect to Spotify
                </a>
              </div>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
