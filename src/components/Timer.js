import React, { useEffect, useState } from 'react';
import * as actionTypes from '../store/actions';
import alarm from '../assets/sounds/alarm.mp3';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { useInterval } from '../hooks/useInterval';
import useSound from 'use-sound';

const Wraper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(230, 230, 230, 0.4);
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;

const ButtonsWraper = styled.div`
  padding-top: 25px;
`;

const TimerSwitchButtonsSharedStyled = css`
  padding: 10px 17px;
  margin: 0 10px;
  text-transform: capitalize;
  border: none;
  border-radius: 4px;

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
      ? 'rgba(125, 125, 125, 0.5)'
      : 'transparent'};
  ${TimerSwitchButtonsSharedStyled}
`;
const ShortBreakButton = styled.button`
  background-color: ${(props) =>
    props.selectedTimer === 'shortBreak'
      ? 'rgba(125, 125, 125, 0.5)'
      : 'transparent'};
  ${TimerSwitchButtonsSharedStyled}
`;
const LongBreakButton = styled.button`
  background-color: ${(props) =>
    props.selectedTimer === 'longBreak'
      ? 'rgba(125, 125, 125, 0.5)'
      : 'transparent'};
  ${TimerSwitchButtonsSharedStyled}
`;

const Time = styled.div`
  padding: 15px 0;
  font-size: 7rem;
  font-weight: 500;
  color: #fdfdfd;
  cursor: default;
`;

const StartStopButtonsWraper = styled.div`
  display: flex;
  justify-content: center;
`;
const StartStopButton = styled.button`
  padding: 10px 40px;
  margin: 0 10px 30px 10px;
  cursor: pointer;
  background-color: #fdfdfd;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  transition: 0.2s ease-in-out;
  text-transform: uppercase;
  font-weight: 500;

  &:hover {
    transform: translateY(-3px);
  }
  &:focus {
    outline: none;
  }
`;

const Goal = styled.p`
  margin: 35px 0;
  text-align: center;
  font-size: 1.4rem;
  color: #fff;
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
