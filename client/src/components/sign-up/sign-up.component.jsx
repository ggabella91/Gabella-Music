import React from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { setCurrentUser } from '../../redux/user/user.actions';

import './sign-up.styles.scss';
import axios from 'axios';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { setCurrentUser } = this.props;
    const { name, email, password, passwordConfirm } = this.state;

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/users/signup',
        {
          name,
          email,
          password,
          passwordConfirm,
        }
      );

      if (res.status === 201) {
        setCurrentUser(res.data.data.user);
      }
    } catch (err) {
      console.log('Error signing up. Please try again later.');
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, email, password, passwordConfirm } = this.state;

    return (
      <div>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='name'
            value={name}
            onChange={this.handleChange}
            label='name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='password'
            required
          />
          <FormInput
            type='password'
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={this.handleChange}
            label='confirm password'
            required
          />
          <div className='button'>
            <Button
              className='submit-button'
              onSubmit={this.handleSubmit}
              type='submit'
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
