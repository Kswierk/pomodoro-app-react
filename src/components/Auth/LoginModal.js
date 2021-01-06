import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import fire from '../../fire';
import Backdrop from '../Backdrop';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Login from './Login';

const StyledModal = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 350px;
  margin: 80px auto;
  border-radius: 4px;
  z-index: 200;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const QuitButton = styled.div`
  border-radius: 6px;
  cursor: pointer;
  &:before,
  &:after {
    content: '';
    padding: 4px;
    position: absolute;
    width: 26px;
    height: 4px;
    background-color: black;
    border-radius: 2px;
    top: 20px;
    right: 10px;
  }

  &:before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  &:after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
`;

const StyledHeader = styled.h3`
  margin: 40px 5% 20px 5%;

  &::after {
    content: '';
    display: block;
    margin-top: 20px;
    width: 100%;
    border-bottom: 1px solid gray;
  }
`;

const LoginModal = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState('');

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
        }
      });
  };

  return (
    <>
      <StyledModal>
        <QuitButton onClick={props.onCloseLogin}></QuitButton>
        <StyledHeader>Login</StyledHeader>
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      </StyledModal>
      <Backdrop />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoginModalOpen: state.login.isLoginModalOpen,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseLogin: (value) =>
      dispatch({ type: actionTypes.CLOSE_LOGIN, payload: value }),
    onSetUser: (user) =>
      dispatch({ type: actionTypes.SET_USER, payload: user }),
    onLogin: () => dispatch({ type: actionTypes.CLOSE_LOGIN }),
  };
};

LoginModal.propTypes = {
  onCloseLogin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
