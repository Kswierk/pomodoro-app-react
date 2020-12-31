import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InsideWraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SignInWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ddd;
  border-radius: 0 0 4px 4px;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  border: none;
  background-color: lightgray;
  padding: 8px;
  margin: 3px 5%;
`;

const StyledLabel = styled.label`
  color: gray;
  margin: 3px 5%;
`;

const StyledButton = styled.button`
  padding: 0.4rem 1.4rem;
  margin-top: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  background-color: #fff;
`;

const StyledSpan = styled.span`
  color: green;
  cursor: pointer;
  margin: 0 10px;
`;

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;
  return (
    <section>
      <InsideWraper>
        <StyledLabel>Username</StyledLabel>
        <StyledInput
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>{emailError}</p>
        <StyledLabel>Password</StyledLabel>
        <StyledInput
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{passwordError}</p>
        <SignInWraper>
          {hasAccount ? (
            <>
              <StyledButton onClick={handleLogin}>Sign in</StyledButton>
              <p>
                Don&apos;t have an account ?
                <StyledSpan onClick={() => setHasAccount(!hasAccount)}>
                  Sign Up
                </StyledSpan>
              </p>
            </>
          ) : (
            <>
              <StyledButton onClick={handleSignup}>Sign up</StyledButton>
              <p>
                Have an account?
                <StyledSpan onClick={() => setHasAccount(!hasAccount)}>
                  Sign In
                </StyledSpan>
              </p>
            </>
          )}
        </SignInWraper>
      </InsideWraper>
    </section>
  );
};

Login.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  handleLogin: PropTypes.func,
  handleSignup: PropTypes.func,
  hasAccount: PropTypes.any,
  setHasAccount: PropTypes.func,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
};

export default Login;
