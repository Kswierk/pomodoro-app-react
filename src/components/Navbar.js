import React from "react";
import styled from "styled-components";
import * as actionTypes from "../store/actions";
import { connect } from "react-redux";

import SettingsModal from "./SettingsModal";
import LoginModal from "./Auth/LoginModal";

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
            <StyledNavButton onClick={props.onToggleLoginModal}>
              login
            </StyledNavButton>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleSettingsModal: () => dispatch({ type: actionTypes.TOGGLE_MODAL }),
    onToggleLoginModal: () =>
      dispatch({ type: actionTypes.TOGGLE_LOGIN_MODAL }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
