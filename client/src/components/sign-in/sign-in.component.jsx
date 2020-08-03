import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { setCurrentUser } from '../../redux/user/user.actions';

import './sign-in.styles.scss';
import axios from 'axios';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { setCurrentUser } = this.props;
    const { email, password } = this.state;

    try {
      const res = await axios.post('http://localhost:8000/api/v1/users/login', {
        email,
        password,
      });

      if (res.status === 200) {
        setCurrentUser(res.data.data.user);
      }
    } catch (err) {
      console.log('Error logging in. Please try again.');
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
              className='submit-button'
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
