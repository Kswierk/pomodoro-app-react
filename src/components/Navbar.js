import React, { useEffect } from "react";
import styled from "styled-components";
import * as actionTypes from "../store/actions";
import { connect } from "react-redux";

import SettingsModal from "./SettingsModal";
import LoginModal from "./Auth/LoginModal";
import fire from "../fire";

const StyledNav = styled.nav`
  display: flex;
  border-bottom: 1px solid #d55314;
  color: #f3ecf1;
  justify-content: space-around;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;
`;

const StyledUl = styled.ul`
  display: flex;
`;

const StyledLi = styled.li`
  list-style: none;
`;

const StyledNavButton = styled.button`
  padding: 7px 30px;
  margin: 0 20px;
  background-color: #386b1f;
  color: #f3ecf1;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const Navbar = (props) => {
  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // clearInputs();
        props.onSetUser(user);
      } else {
        props.onSetUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
      {props.isSettingsModalOpen || props.isModalBlocked ? (
        <SettingsModal />
      ) : null}
      {props.isLoginModalOpen ? <LoginModal /> : null}

      <StyledNav>
        <div>PomodoroFocused</div>
        <StyledUl>
          <StyledLi>
            <StyledNavButton onClick={props.onToggleSettingsModal}>
              settings
            </StyledNavButton>
          </StyledLi>
          <StyledLi>
            {/* <StyledNavButton onClick={props.onToggleLoginModal}> */}
            {props.user ? (
              <StyledNavButton onClick={handleLogout}>logout</StyledNavButton>
            ) : (
              <StyledNavButton onClick={props.onToggleLoginModal}>
                login
              </StyledNavButton>
            )}
            {/* </StyledNavButton> */}
          </StyledLi>
        </StyledUl>
      </StyledNav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isSettingsModalOpen: state.ui.isModalOpen,
    isLoginModalOpen: state.login.isLoginModalOpen,
    isModalBlocked: state.ui.blockmodal,
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleSettingsModal: () => dispatch({ type: actionTypes.TOGGLE_MODAL }),
    onToggleLoginModal: () =>
      dispatch({ type: actionTypes.TOGGLE_LOGIN_MODAL }),
    onSetUser: (user) =>
      dispatch({ type: actionTypes.SET_USER, payload: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
