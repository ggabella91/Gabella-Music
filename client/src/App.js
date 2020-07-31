import React from 'react';
import { Route, Switch /*Redirect*/ } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignUpAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-sign-up.component.jsx';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import axios from 'axios';
axios.defaults.withCredentials = true;

class App extends React.Component {
  componentDidMount = async () => {
    const { setCurrentUser } = this.props;

    const res = await axios.get(
      'http://localhost:8000/api/v1/users/isLoggedIn'
    );

    if (res.locals.user && res.locals.user.length > 0) {
      setCurrentUser({
        ...res.locals.user,
      });
    }
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={SignUpAndSignUpPage} />
          <Route exact path='/me' component={HomePage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
