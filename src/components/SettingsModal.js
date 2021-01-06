import React, { useState } from 'react';
import * as actionTypes from '../store/actions';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AiOutlineLock } from 'react-icons/ai';

import Backdrop from './Backdrop';

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

const ModalWraper = styled.div`
  margin: 40px 5%;
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

const InputsWraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const FormWraper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledLabel = styled.label`
  color: gray;
  margin-bottom: 3px;
`;
const StyledInput = styled.input`
  border-radius: 4px;
  border: none;
  background-color: lightgray;
  padding: 8px;
`;

const DarkModeHeader = styled.h3`
  &::before {
    content: '';
    background-color: black;
    height: 1px;
    width: 100%;
    display: block;
    margin: 20px auto;
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 65px;
  height: 34px;
  padding: 2px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.switched ? '#841F27' : 'lightgray')};
  -webkit-transition: 0.2s;
  transition: 0.2s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: ${(props) => (props.switched ? '39px' : '4px')};
    bottom: 6px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const WrongValueWarning = styled.p`
  display: ${(props) => (props.showWarning ? 'block' : 'none')};
  color: red;
`;

const SaveButtonWraper = styled.div`
  height: 60px;
  background-color: lightgray;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 4px 4px;
`;

const SaveButton = styled.button`
  padding: 0.4rem 1.4rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  text-transform: capitalize;
  background-color: #fff;
`;

const DarkModeFlexWraper = styled.div`
  display: flex;
  align-items: center;
`;

const ClosedLock = styled(AiOutlineLock)`
  font-size: 25px;
  margin-left: 10px;
`;

const StyledMessage = styled.p`
  font-size: 0.7rem;
  margin-left: 10px;
`;

const SettingsModal = (props) => {
  const [isProvidedTimeValueWrong, setIsProvidedTimeValueWrong] = useState(
    false
  );

  const [isHovering, setIsHovering] = useState(false);

  const checkProvidedTimeValue = (e) => {
    if (e.target.value < 1 || e.target.value > 59) {
      props.onSetBlockModal(true);
      setIsProvidedTimeValueWrong(true);
    } else {
      props.onSetBlockModal(false);
      setIsProvidedTimeValueWrong(false);
    }
  };

  const handleMouseHover = () => {
    setIsHovering(!isHovering);
  };

  return (
    <>
      <StyledModal>
        <QuitButton onClick={props.onToggleModal}></QuitButton>
        <ModalWraper>
          <h3>Settings</h3>
          <hr />
          <h3>Set custom time (minutes)</h3>
          <WrongValueWarning showWarning={isProvidedTimeValueWrong}>
            please enter a value between 1 and 59
          </WrongValueWarning>
          <FormWraper>
            <InputsWraper>
              <StyledLabel>Pomodoro</StyledLabel>
              <StyledInput
                max="59"
                min="1"
                type="number"
                name="pomodoro"
                id="pomodoro"
                defaultValue={props.time / 60}
                onChange={(e) => {
                  props.onSetTimer(e.target.value);
                  props.onSetCurrentSessionLeft(e.target.value);

                  checkProvidedTimeValue(e);
                  console.log(props.isModalBlocked);
                }}
              />
            </InputsWraper>
            <InputsWraper>
              <StyledLabel>Short break</StyledLabel>
              <StyledInput
                max="59"
                min="1"
                type="number"
                name="shortbreak"
                id="shortbreak"
                defaultValue={props.shortBreakTime / 60}
                onChange={(e) => {
                  props.onSetShortBreak(e.target.value);
                  props.onSetShortBreakSessionLeft(e.target.value);

                  checkProvidedTimeValue(e);
                }}
              />
            </InputsWraper>
            <InputsWraper>
              <StyledLabel>Long break</StyledLabel>
              <StyledInput
                max="59"
                min="1"
                type="number"
                name="longbreak"
                id="longbreak"
                defaultValue={props.longBreakTime / 60}
                onChange={(e) => {
                  props.onSetLongBreak(e.target.value);
                  props.onSetLongBreakSessionLeft(e.target.value);

                  checkProvidedTimeValue(e);
                }}
              />
            </InputsWraper>
          </FormWraper>
          <div>
            <DarkModeHeader>Dark Mode</DarkModeHeader>
            <DarkModeFlexWraper>
              <Switch
                onMouseEnter={handleMouseHover}
                onMouseLeave={handleMouseHover}
              >
                <input
                  disabled={!props.isLogged}
                  name="darkmode"
                  id="darkmode"
                  onClick={props.onChangeDarkMode}
                  type="checkbox"
                />

                <Slider switched={props.darkMode}></Slider>
              </Switch>
              {props.isLogged ? null : <ClosedLock />}
              {props.isLogged
                ? null
                : isHovering && (
                    <StyledMessage>Login to enable DarkMode</StyledMessage>
                  )}
            </DarkModeFlexWraper>
          </div>
        </ModalWraper>
        <SaveButtonWraper>
          <SaveButton onClick={props.onToggleModal}>save</SaveButton>
        </SaveButtonWraper>
      </StyledModal>

      <Backdrop />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    time: state.pomo.time,
    timeLeft: state.pomo.currentSessionTimeLeft,
    shortBreakTime: state.pomo.shortBreakTime,
    shortBreakTimeLeft: state.pomo.shortBreakTimeLeft,
    longBreakTime: state.pomo.longBreakTime,
    longBreakTimeLeft: state.pomo.longBreakTimeLeft,
    darkMode: state.ui.darkmode,
    isModalBlocked: state.ui.blockmodal,
    isLogged: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetTimer: (value) =>
      dispatch({ type: actionTypes.SET_TIMER, payload: value }),
    onSetCurrentSessionLeft: (value) =>
      dispatch({ type: actionTypes.SET_CURRENT_SEESION, payload: value }),

    onSetShortBreak: (value) =>
      dispatch({ type: actionTypes.SET_SHORTBREAK, payload: value }),
    onSetShortBreakSessionLeft: (value) =>
      dispatch({ type: actionTypes.SET_SHORTBREAK_SESSION, payload: value }),

    onSetLongBreak: (value) =>
      dispatch({ type: actionTypes.SET_LONGBREAK, payload: value }),
    onSetLongBreakSessionLeft: (value) =>
      dispatch({ type: actionTypes.SET_LONGBREAK_SESSION, payload: value }),

    onChangeDarkMode: () => dispatch({ type: actionTypes.SET_DARKMODE }),
    onSetBlockModal: (isTrue) =>
      dispatch({ type: actionTypes.SETBLOCK_MODAL, payload: isTrue }),
    onToggleModal: () => dispatch({ type: actionTypes.TOGGLE_MODAL }),
    onChoseTimer: (selectedTimer) =>
      dispatch({ type: actionTypes.CHOOSE_TIMER, payload: selectedTimer }),
  };
};

SettingsModal.propTypes = {
  onSetBlockModal: PropTypes.func,
  onToggleModal: PropTypes.func,
  time: PropTypes.number,
  onSetTimer: PropTypes.func,
  onSetCurrentSessionLeft: PropTypes.func,
  isModalBlocked: PropTypes.bool,
  shortBreakTime: PropTypes.number,
  onSetShortBreak: PropTypes.func,
  onSetShortBreakSessionLeft: PropTypes.func,
  onSetLongBreak: PropTypes.func,
  onSetLongBreakSessionLeft: PropTypes.func,
  longBreakTime: PropTypes.number,
  isLogged: PropTypes.any,
  onChangeDarkMode: PropTypes.func,
  darkMode: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
