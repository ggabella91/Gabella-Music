import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';

import Alert from 'react-bootstrap/Alert';

import {
  selectForgotOrResetError,
  selectForgotOrResetConfirm,
} from '../../redux/user/user.selectors';
import { forgotPasswordStart } from '../../redux/user/user.actions';

import './forgot-password.styles.scss';

const ForgotPasswordPage = ({
  forgotError,
  forgotConfirm,
  forgotPasswordStart,
}) => {
  const [userEmail, setUserEmail] = useState({ email: '' });
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState({ success: false, error: false });

  const { email } = userEmail;

  const handleSubmit = async (event) => {
    event.preventDefault();

    forgotPasswordStart(email);
  };

  useEffect(() => {
    if (forgotError) {
      setStatus({ ...status, error: true });
    } else if (forgotConfirm) {
      setStatus({ ...status, success: true });
    }
  }, [forgotError, forgotConfirm]);

  const handleRenderAlert = (type, message) => {
    if (type === 'error' && show) {
      setTimeout(() => {
        setUserEmail({ email: '' });
        setStatus({ success: false, error: false });
      }, 5000);
      return (
        <Alert variant='danger' onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      );
    } else if (type === 'success' && show) {
      setTimeout(() => {
        setUserEmail({ email: '' });
        setStatus({ success: false, error: false });
      }, 5000);
      return (
        <Alert variant='success' onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      );
    }
  };

  const handleChange = (event) => {
    let { value, name } = event.target;

    setUserEmail({ ...userEmail, [name]: value });
  };

  return (
    <div>
      <form className='forgot-password' onSubmit={handleSubmit}>
        <span>
          Enter your email below, and you will be sent a link to reset your
          password!
        </span>
        <FormInput
          type='text'
          name='email'
          value={email}
          onChange={handleChange}
          label='email'
          required
        />
        <div className='button'>
          <Button
            className='submit-button'
            onSubmit={handleSubmit}
            type='submit'
          >
            Send Link
          </Button>
        </div>
      </form>
      <div className='alert'>
        {status.error
          ? handleRenderAlert('error', 'There is no user with this email.')
          : null}
        {status.success
          ? handleRenderAlert('success', 'Password reset link sent!')
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  forgotError: selectForgotOrResetError,
  forgotConfirm: selectForgotOrResetConfirm,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPasswordStart: (email) => dispatch(forgotPasswordStart(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
