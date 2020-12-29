import React, { useEffect, useState } from 'react';
import * as actionTypes from '../store/actions';
import alarm from '../assets/sounds/alarm.mp3';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { useInterval } from '../hooks/useInterval';
import useSound from 'use-sound';

const Wraper = styled.div`
  max-width: 430px;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(230, 230, 230, 0.4);
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;

const ButtonsWraper = styled.div`
  padding-top: 15px;
`;

const TimerSwitchButtonsSharedStyled = css`
  padding: 8px 15px;
  margin: 0 10px;
  text-transform: capitalize;
  border: none;
  border-radius: 4px;
  /* background-color: transparent; */

  color: #f3ecf1;
  cursor: pointer;
  z-index: 30;

  &:focus {
    outline: none;
  }
`;

const PomoTimerButton = styled.button`
  background-color: ${(props) =>
    props.selectedTimer === 'pomodoro'
      ? 'rgba(250, 230, 230, 0.5)'
      : 'transparent'};
  ${TimerSwitchButtonsSharedStyled}
`;
const ShortBreakButton = styled.button`
  background-color: ${(props) =>
    props.selectedTimer === 'shortBreak'
      ? 'rgba(250, 230, 230, 0.5)'
      : 'transparent'};
  ${TimerSwitchButtonsSharedStyled}
`;
const LongBreakButton = styled.button`
  background-color: ${(props) =>
    props.selectedTimer === 'longBreak'
      ? 'rgba(250, 230, 230, 0.5)'
      : 'transparent'};
  ${TimerSwitchButtonsSharedStyled}
`;

const Time = styled.div`
  /* padding: 30px 0; */
  font-size: 7rem;
  font-weight: 700;
  color: #f3ecf1;
`;

const StartStopButtonsWraper = styled.div`
  display: flex;
  justify-content: center;
`;
const StartStopButton = styled.button`
  padding: 8px 30px;
  margin: 0 10px 20px 10px;
  cursor: pointer;
  background-color: transparent;
  color: #f3ecf1;
  border: 1px solid #f3ecf1;
  border-radius: 4px;
  transition: 0.2s ease-in-out;
  font-size: 1.2rem;
  text-transform: uppercase;

  &:hover {
    transform: translateY(-3px);
  }
  &:focus {
    outline: none;
  }
`;

const Goal = styled.p`
  text-align: center;
  font-size: 1.4rem;
`;

const Timer = (props) => {
  const [delay, setDelay] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const decrementTime = () => {
    if (props.selectedTimer === 'pomodoro') {
      return props.onDecrementTimer();
    } else if (props.selectedTimer === 'shortBreak') {
      return props.onDecrementShortBreak();
    } else {
      return props.onDecrementLongBreak();
    }
  };

  useInterval(() => {
    decrementTime();
    calculateTimeLeft();
  }, delay);

  const calculateTimeLeft = (chosenTimerTimeLeft) => {
    let result = '';
    const seconds = chosenTimerTimeLeft % 60;
    const minutes = parseInt(chosenTimerTimeLeft / 60) % 60;
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time;
    }
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    return result;
  };

  const toggleClockHandler = () => {
    setIsTimerActive(true);
    setDelay(1000);
    if (isTimerActive) {
      setDelay(null);
      setIsTimerActive(false);
    }
  };

  const resetClockHandler = () => {
    props.onResetTimer();
    setIsTimerActive(false);
    setDelay(null);
  };

  const selectPomodoroTimer = () => {
    props.onChoseTimer('pomodoro');
  };
  const selectShortBreak = () => {
    props.onChoseTimer('shortBreak');
  };
  const selectLongBreak = () => {
    props.onChoseTimer('longBreak');
  };

  const calculateChosenTime = () => {
    if (props.selectedTimer === 'pomodoro') {
      return calculateTimeLeft(props.timeLeft);
    } else if (props.selectedTimer === 'shortBreak') {
      return calculateTimeLeft(props.shortBreakTimeLeft);
    } else {
      return calculateTimeLeft(props.longBreakTimeLeft);
    }
  };

  const [play, { stop }] = useSound(alarm, { volume: 1 });

  useEffect(() => {
    if (
      props.timeLeft === 0 ||
      props.shortBreakTimeLeft === 0 ||
      props.longBreakTimeLeft === 0
    ) {
      play();
      selectShortBreak();
      resetClockHandler();
      setTimeout(() => {
        stop();
      }, 3000);
    }
  }, [
    props.timeLeft,
    props.longBreakTimeLeft,
    props.shortBreakTimeLeft,
    play,
    stop,
    selectShortBreak,
    resetClockHandler,
  ]);

  return (
    <>
      <Wraper>
        <ButtonsWraper>
          <PomoTimerButton
            selectedTimer={props.selectedTimer}
            onClick={() => {
              selectPomodoroTimer();
              resetClockHandler();
            }}
          >
            pomodoro
          </PomoTimerButton>
          <ShortBreakButton
            selectedTimer={props.selectedTimer}
            onClick={() => {
              selectShortBreak();
              resetClockHandler();
            }}
          >
            short break
          </ShortBreakButton>
          <LongBreakButton
            selectedTimer={props.selectedTimer}
            onClick={() => {
              selectLongBreak();
              resetClockHandler();
            }}
          >
            long break
          </LongBreakButton>
        </ButtonsWraper>
        <Time>{calculateChosenTime()}</Time>
        <StartStopButtonsWraper>
          <StartStopButton onClick={toggleClockHandler}>
            {isTimerActive ? 'stop' : 'start'}
          </StartStopButton>
          <StartStopButton onClick={resetClockHandler}>reset</StartStopButton>
        </StartStopButtonsWraper>
      </Wraper>

      <Goal>
        {props.selectedTimer !== 'pomodoro' ? 'take a break' : 'time to work'}
      </Goal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    time: state.pomo.time,
    timeLeft: state.pomo.currentSessionTimeLeft,
    selectedTimer: state.pomo.chosenTimer,
    shortBreakTimeLeft: state.pomo.shortBreakTimeLeft,
    longBreakTimeLeft: state.pomo.longBreakTimeLeft,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetTimer: () => dispatch({ type: actionTypes.SET_TIMER }),
    onResetTimer: () => dispatch({ type: actionTypes.RESET_TIMER }),
    onDecrementTimer: () => dispatch({ type: actionTypes.DECREMENT_TIMER }),
    onDecrementShortBreak: () =>
      dispatch({ type: actionTypes.DECREMENT_SHORTBREAK }),
    onDecrementLongBreak: () =>
      dispatch({ type: actionTypes.DECREMENT_LONGBREAK }),
    onChoseTimer: (selectedTimer) =>
      dispatch({ type: actionTypes.CHOOSE_TIMER, payload: selectedTimer }),
  };
};

Timer.propTypes = {
  selectedTimer: PropTypes.string,
  onDecrementLongBreak: PropTypes.func,
  onDecrementShortBreak: PropTypes.func,
  onDecrementTimer: PropTypes.func,
  onResetTimer: PropTypes.func,
  onSetTimer: PropTypes.func,
  onChoseTimer: PropTypes.func,
  timeLeft: PropTypes.number,
  shortBreakTimeLeft: PropTypes.number,
  longBreakTime: PropTypes.number,
  longBreakTimeLeft: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
