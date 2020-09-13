import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';

import Alert from 'react-bootstrap/Alert';

import {
  selectForgotOrResetError,
  selectForgotOrResetConfirm,
} from '../../redux/user/user.selectors';
import { resetPasswordStart } from '../../redux/user/user.actions';

import './reset-password.styles.scss';

const ResetPasswordPage = ({
  resetError,
  resetConfirm,
  resetPasswordStart,
}) => {
  const [userPassword, setUserPassword] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState({ success: false, error: false });
  const { token } = useParams();

  let history = useHistory();

  const { password, passwordConfirm } = userPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();

    resetPasswordStart(password, passwordConfirm, token);
  };

  useEffect(() => {
    if (resetError) {
      setStatus({ ...status, error: true });
    } else if (resetConfirm) {
      setStatus({ ...status, success: true });
    }
  }, [resetError, resetConfirm]);

  const handleRenderAlert = (type, message) => {
    if (type === 'error' && show) {
      setTimeout(() => {
        setUserPassword({ password: '', passwordConfirm: '' });
        setStatus({ success: false, error: false });
      }, 5000);
      return (
        <Alert variant='danger' onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      );
    } else if (type === 'success' && show) {
      setTimeout(() => {
        setUserPassword({ password: '', passwordConfirm: '' });
        setStatus({ success: false, error: false });
        history.push('/');
      }, 3000);
      return (
        <Alert variant='success' onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      );
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserPassword({ ...userPassword, [name]: value });
  };

  return (
    <div className='reset-page'>
      <form className='reset-password' onSubmit={handleSubmit}>
        <span>Set your new password below.</span>
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
            className='submit-button reset-button'
            onSubmit={handleSubmit}
            type='submit'
          >
            Change Password
          </Button>
        </div>
      </form>
      <div className='alert'>
        {status.error
          ? handleRenderAlert('error', 'Token is incorrect or has expired.')
          : null}
        {status.success
          ? handleRenderAlert('success', 'Password reset successfully!')
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  resetError: selectForgotOrResetError,
  resetConfirm: selectForgotOrResetConfirm,
});

const mapDispatchToProps = (dispatch) => ({
  resetPasswordStart: (password, passwordConfirm, token) =>
    dispatch(resetPasswordStart(password, passwordConfirm, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
