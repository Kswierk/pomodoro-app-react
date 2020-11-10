import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useInterval } from "../hooks/useInterval";

import { TimerContext } from "../context/TimerContext";
import { ResetTimeContext } from "../context/ResetTimeContext";

const Wraper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  background-color: #eee;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;

const ButtonsWraper = styled.div`
  padding-top: 20px;
`;

const TimerSwitchButton = styled.button`
  padding: 8px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  background-color: #ccc;
  cursor: pointer;
`;

const Time = styled.div`
  padding: 30px 0;
  font-size: 7rem;
  font-weight: 700;
`;

const StartStopButtonsWraper = styled.div`
  display: flex;
  justify-content: center;
`;
const StartStopButton = styled.button`
  padding: 8px 30px;
  margin: 0 10px 20px 10px;
  cursor: pointer;
`;

const Goal = styled.p`
  text-align: center;
  padding: 30px;
  font-size: 1.4rem;
`;

const Timer = () => {
  const [sessionTimeSet, setTimeSessionSet] = useContext(TimerContext);
  const [pickedTimeSet, setPickedTimeSet] = useContext(ResetTimeContext);
  const [delay, setDelay] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const decrementTime = () => {
    setPickedTimeSet(pickedTimeSet - 1);
    console.log(pickedTimeSet);
  };

  useInterval(() => {
    decrementTime();
    console.log(sessionTimeSet);
    calculateTimeLeft();
  }, delay);

  const calculateTimeLeft = () => {
    let result = "";
    const seconds = pickedTimeSet % 60;
    const minutes = parseInt(pickedTimeSet / 60) % 60;
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time;
    }
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    console.log(pickedTimeSet);
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
    setPickedTimeSet(sessionTimeSet);
    // console.log(pickedTimeSet);
    setIsTimerActive(false);
    setDelay(null);
  };

  return (
    <>
      <Wraper>
        <ButtonsWraper>
          <TimerSwitchButton>pomodoro</TimerSwitchButton>
          <TimerSwitchButton>short break</TimerSwitchButton>
          <TimerSwitchButton>long break</TimerSwitchButton>
        </ButtonsWraper>
        <Time>{calculateTimeLeft()}</Time>
        <StartStopButtonsWraper>
          <StartStopButton onClick={toggleClockHandler}>
            {isTimerActive ? "stop" : "start"}
          </StartStopButton>
          <StartStopButton onClick={resetClockHandler}>reset</StartStopButton>
        </StartStopButtonsWraper>
      </Wraper>
      <Goal>time to work</Goal>
    </>
  );
};

export default Timer;
