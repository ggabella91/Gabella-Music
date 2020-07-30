import React from 'react';
import { Route, Switch /*Redirect*/ } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { createStructuredSelector } from 'reselect';

import './App.css';
//import { HomePage } from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignUpAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-sign-up.component.jsx';

class App extends React.Component {
  componentDidMount = async () => {};

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={SignUpAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
