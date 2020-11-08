import React from "react";
import styled from "styled-components";

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
  return (
    <>
      <Wraper>
        <ButtonsWraper>
          <TimerSwitchButton>pomodoro</TimerSwitchButton>
          <TimerSwitchButton>short break</TimerSwitchButton>
          <TimerSwitchButton>long break</TimerSwitchButton>
        </ButtonsWraper>
        <Time>0000</Time>
        <StartStopButtonsWraper>
          <StartStopButton>start</StartStopButton>
          <StartStopButton>reset</StartStopButton>
        </StartStopButtonsWraper>
      </Wraper>
      <Goal>time to work</Goal>
    </>
  );
};

export default Timer;
