import React from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

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

    const { signUpStart } = this.props;
    const { name, email, password, passwordConfirm } = this.state;

    signUpStart(name, email, password, passwordConfirm);
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
  signUpStart: (name, email, password, passwordConfirm) =>
    dispatch(signUpStart(name, email, password, passwordConfirm)),
});

export default connect(null, mapDispatchToProps)(SignUp);
