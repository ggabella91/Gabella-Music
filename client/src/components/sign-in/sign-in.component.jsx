import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { setCurrentUser } from '../../redux/user/user.actions';

import './sign-in.styles.scss';
import axios from 'axios';

// NEED TO FIX MEMORY LEAK WARNING WHEN STATE IS CHANGED AND COMPONENT UNMOUNTS

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.axiosCancelSource = axios.CancelToken.source();

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
        cancelToken: this.axiosCancelSource.token,
      });

      if (res.status === 200) {
        setCurrentUser(res.data.data.user);
        this.setState({ email: '', password: '' });
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        console.log(err);
        this.setState({ email: '', password: '' });
      }
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.setState({ email: '', password: '' });
    this._isMounted = false;
    this.axiosCancelSource.cancel('Component unmounted.');
  }

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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
