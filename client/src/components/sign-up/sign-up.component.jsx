import React, { useState } from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    signUpStart(name, email, password, passwordConfirm);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
          label='name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='password'
          required
        />
        <FormInput
          type='password'
          name='passwordConfirm'
          value={passwordConfirm}
          onChange={handleChange}
          label='confirm password'
          required
        />
        <div className='button'>
          <Button
            className='submit-button'
            onSubmit={handleSubmit}
            type='submit'
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (name, email, password, passwordConfirm) =>
    dispatch(signUpStart(name, email, password, passwordConfirm)),
});

export default connect(null, mapDispatchToProps)(SignUp);
