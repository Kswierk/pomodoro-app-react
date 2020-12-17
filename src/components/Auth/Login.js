import React from "react";
import styled from "styled-components";

const InsideWraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SignInWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  border: none;
  background-color: lightgray;
  padding: 8px;
`;

const StyledLabel = styled.label`
  color: gray;
`;

const StyledButton = styled.button`
  padding: 0.4rem 1.4rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
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
                Don't have an account ?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <StyledButton onClick={handleSignup}>Sign up</StyledButton>
              <p>
                Have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span>
              </p>
            </>
          )}
        </SignInWraper>
      </InsideWraper>
    </section>
  );
};

export default Login;
