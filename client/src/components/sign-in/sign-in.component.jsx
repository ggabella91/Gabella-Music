import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import Alert from 'react-bootstrap/Alert';
import { signInStart } from '../../redux/user/user.actions';
import { selectUserSignInOrOutError } from '../../redux/user/user.selectors';

import './sign-in.styles.scss';

const SignIn = ({ signInStart, signInError }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [show, setShow] = useState(true);

  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();

    signInStart(email, password);
  };

  const [error, setError] = useState(false);

  useEffect(() => {
    if (signInError) {
      setError(true);
    }
  }, [signInError]);

  const handleRenderAlert = (type, message) => {
    if (type === 'error' && show) {
      return (
        <Alert variant='danger' onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      );
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={email}
          handleChange={handleChange}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />
        <div>
          {error
            ? handleRenderAlert('error', 'Incorrect email or password.')
            : null}
        </div>

        <div className='button'>
          <Button
            className='submit-button'
            onSubmit={handleSubmit}
            type='submit'
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  signInError: selectUserSignInOrOutError,
});

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
