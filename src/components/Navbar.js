import React from "react";
import styled from "styled-components";
import * as actionTypes from "../store/actions";
import { connect } from "react-redux";

import SettingsModal from "./SettingsModal";

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
      {props.isModalOpen || props.isModalBlocked ? <SettingsModal /> : null}

      <StyledNav>
        <div>PomodoroFocused</div>
        <StyledUl>
          <StyledLi>
            <StyledNavButton onClick={props.onToggleModal}>
              settings
            </StyledNavButton>
          </StyledLi>
          <StyledLi>
            <StyledNavButton>login</StyledNavButton>
          </StyledLi>
        </StyledUl>
      </StyledNav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.ui.isModalOpen,
    isModalBlocked: state.ui.blockmodal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: () => dispatch({ type: actionTypes.TOGGLE_MODAL }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
