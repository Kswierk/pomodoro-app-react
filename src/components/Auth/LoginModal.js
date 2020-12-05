import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import Backdrop from "../Backdrop";

import styled from "styled-components";

const StyledModal = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 350px;
  height: 30vh;
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
    content: "";
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
    /* left: 1px; */
  }
  &:after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
`;

const StyledHeader = styled.h3``;

const InputsWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 80%;
  height: 30px;
  border: 1px solid gray;
  border-radius: 4px;
  margin: 10px auto;
`;

const StyledButton = styled.button`
  width: 30%;
  border: none;
  height: 30px;
  border-radius: 4px;
  background-color: #eee;
`;

const ModalWraper = styled.div`
  margin: 40px 5%;
`;

const LoginModal = (props) => {
  return (
    <>
      <StyledModal>
        <QuitButton onClick={props.onCloseLogin}></QuitButton>
        <ModalWraper>
          <StyledHeader>Login</StyledHeader>
          <hr />
          <InputsWraper>
            <StyledInput placeholder="Email" />
            <StyledInput placeholder="Password" />
            <StyledButton>Login</StyledButton>
          </InputsWraper>
        </ModalWraper>
      </StyledModal>
      <Backdrop />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoginModalOpen: state.login.isLoginModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseLogin: (value) =>
      dispatch({ type: actionTypes.CLOSE_LOGIN, payload: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
