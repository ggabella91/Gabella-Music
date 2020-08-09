import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import SignUpAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-sign-up.component.jsx';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import axios from 'axios';
axios.defaults.withCredentials = true;

class App extends React.Component {
  componentDidMount = async () => {
    const { checkUserSession } = this.props;

    checkUserSession();
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              this.props.currentUser !== null ? (
                <Redirect to='/me' />
              ) : (
                <SignUpAndSignUpPage />
              )
            }
          />
          <Route
            exact
            path='/me'
            render={() =>
              this.props.currentUser === null ? (
                <Redirect to='/' />
              ) : (
                <HomePage />
              )
            }
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
