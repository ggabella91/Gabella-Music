import React from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in.styles.scss';
import axios from 'axios';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const res = await axios.post('http://localhost:8000/api/v1/users/login', {
        email,
        password,
      });

      if (res.status === 200) {
        this.setState({ isLoggedIn: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />

          <div className='button'>
            <Button
              className='spotify-button'
              onSubmit={this.handleSubmit}
              type='submit'
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
