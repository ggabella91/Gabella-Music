import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { signInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = ({ signInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();

    signInStart(email, password);
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

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart(email, password)),
});

export default connect(null, mapDispatchToProps)(SignIn);
