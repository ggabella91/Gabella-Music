import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { createStructuredSelector } from 'reselect';

import './App.css';
import {
  HomePage,
  handleClickSpotifyButton,
  callSpotifyApi,
} from './pages/homepage/homepage.component';

class App extends React.Component {
  componentDidMount = async () => {
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

  render() {
    return (
      <div className='App'>
        <header className='App-header'></header>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
