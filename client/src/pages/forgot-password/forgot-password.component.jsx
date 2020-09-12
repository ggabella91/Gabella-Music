import React, { useState, useEffect } from 'react';
import FormInput from '../../components/form-input/form-input.component';

import Alert from 'react-bootstrap/Alert';

import './forgot-password.styles.scss';

const ForgotPasswordPage = () => {
  const [userEmail, setUserEmail] = useState('');

  const [show, setShow] = useState(true);

  const email = userEmail;

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

    setUserEmail(email);
  };

  return (
    <div>
      <form className='forgot-password'>
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
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
