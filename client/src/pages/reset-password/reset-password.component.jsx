import React, { useState, useEffect } from 'react';
import FormInput from '../../components/form-input/form-input.component';

import Alert from 'react-bootstrap/Alert';

import './reset-password.styles.scss';

const ResetPasswordPage = () => {
  const [userPassword, setUserPassword] = useState({
    password: '',
    passwordConfirm: '',
  });

  const [show, setShow] = useState(true);

  const { password, passwordConfirm } = userPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // signUpStart(name, email, password, passwordConfirm);
  };

  const [error, setError] = useState(false);

  //   useEffect(() => {
  //     if (signUpError) {
  //       setError(true);
  //     }
  //   }, [signUpError]);

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
    const email = event.target;

    // setUserEmail(email);
  };

  return (
    <div className='reset-password'>
      <span className='reset-text'>Set your new password below</span>
      <form>
        <FormInput
          type='text'
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
      </form>
    </div>
  );
};

export default ResetPasswordPage;
