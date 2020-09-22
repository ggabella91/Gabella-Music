import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import SignUpAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-sign-up.component.jsx';
import ForgotPasswordPage from './pages/forgot-password/forgot-password.component';
import ResetPasswordPage from './pages/reset-password/reset-password.component';
import SettingsPage from './pages/settings-page/settings-page.component.jsx';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route
          exact
          path='/settings'
          render={() =>
            currentUser !== null ? <SettingsPage /> : <Redirect to='/' />
          }
        />

        <Route
          exact
          path='/forgot-password'
          render={() => <ForgotPasswordPage />}
        />
        <Route
          path='/reset-password/:token'
          render={() => <ResetPasswordPage />}
        />
        <Route
          exact
          path='/me'
          render={() =>
            currentUser === null ? <Redirect to='/' /> : <HomePage />
          }
        />
        <Route
          exact
          path='/'
          render={() =>
            currentUser !== null ? (
              <Redirect to='/me' />
            ) : (
              <SignUpAndSignUpPage />
            )
          }
        />
      </Switch>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
