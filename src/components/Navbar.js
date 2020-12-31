import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BiLogIn } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import SettingsModal from './SettingsModal';
import LoginModal from './Auth/LoginModal';
import fire from '../fire';

const StyledNav = styled.nav`
  display: flex;
  border-bottom: 1px solid #fdfdfd;
  color: #fdfdfd;
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
  background-color: rgba(176, 176, 176, 0.5);
  display: flex;
  align-items: center;
  color: #fdfdfd;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
`;
const SettingsIcon = styled(FiSettings)`
  font-size: 1rem;
  margin-right: 5px;
`;

const LoginIcon = styled(BiLogIn)`
  font-size: 1rem;
  margin-right: 5px;
  color: white;
`;

const Navbar = (props) => {
  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('logged in');
        props.onCloseLoginModal();
        props.onSetUser(user);
      } else {
        props.onSetUser('');
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
        <div>pomoDorro</div>
        <StyledUl>
          <StyledLi>
            <StyledNavButton onClick={props.onToggleSettingsModal}>
              <SettingsIcon />
              Settings
            </StyledNavButton>
          </StyledLi>
          <StyledLi>
            {props.user ? (
              <StyledNavButton onClick={handleLogout}>
                <LoginIcon /> Logout
              </StyledNavButton>
            ) : (
              <StyledNavButton onClick={props.onToggleLoginModal}>
                <LoginIcon /> Login
              </StyledNavButton>
            )}
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
    onCloseLoginModal: () => dispatch({ type: actionTypes.CLOSE_LOGIN }),
  };
};

Navbar.propTypes = {
  onCloseLoginModal: PropTypes.func,
  user: PropTypes.any,
  onSetUser: PropTypes.func,
  isSettingsModalOpen: PropTypes.bool,
  isLoginModalOpen: PropTypes.bool,
  isModalBlocked: PropTypes.bool,
  onToggleSettingsModal: PropTypes.func,
  onToggleLoginModal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
