import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TimerContext } from "../context/TimerContext";
import { ResetTimeContext } from "../context/ResetTimeContext";

import Backdrop from "./Backdrop";

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
`;
const StyledInput = styled.input`
  border-radius: 4px;
  border: none;
  background-color: lightgray;
  padding: 8px;
`;

const DarkModeHeader = styled.h3`
  &::before {
    content: "";
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
  width: 60px;
  height: 34px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.switched ? "#ff6347" : "#ccc")};
  -webkit-transition: 0.2s;
  transition: 0.2s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: ${(props) => (props.switched ? "31px" : "4px")};
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SaveButtonWraper = styled.div`
  height: 60px;
  background-color: #ddd;
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
`;

const SettingsModal = (props) => {
  const [sessionTimeSet, setTimeSessionSet] = useContext(TimerContext);
  const setPickedTimeSet = useContext(ResetTimeContext)[1];
  const [isSwitchClicked, setIsSwitchClicked] = useState(false);

  return (
    <>
      <StyledModal>
        <QuitButton onClick={props.toggleBackdrop}></QuitButton>
        <ModalWraper>
          <h3>Settings</h3>
          <hr />
          <h3>Set custom time(minutes)</h3>
          <FormWraper>
            <InputsWraper>
              <StyledLabel>Pomodoro</StyledLabel>
              <StyledInput
                type="number"
                name="pomodoro"
                id="pomodoro"
                defaultValue={sessionTimeSet / 60}
                onChange={(e) => {
                  setTimeSessionSet(e.target.value * 60);
                  setPickedTimeSet(e.target.value * 60);
                }}
              />
            </InputsWraper>
            <InputsWraper>
              <StyledLabel>short break</StyledLabel>
              <StyledInput
                name="shortbreak"
                id="shortbreak"
                defaultValue={10}
              />
            </InputsWraper>
            <InputsWraper>
              <StyledLabel>long break</StyledLabel>
              <StyledInput name="longbreak" id="longbreak" defaultValue={15} />
            </InputsWraper>
          </FormWraper>
          <div>
            <DarkModeHeader>Dark Mode</DarkModeHeader>
            <Switch>
              <input
                name="darkmode"
                id="darkmode"
                onClick={() => setIsSwitchClicked(!isSwitchClicked)}
                type="checkbox"
              />

              <Slider switched={isSwitchClicked}></Slider>
            </Switch>
          </div>
        </ModalWraper>
        <SaveButtonWraper>
          <SaveButton onClick={props.toggleBackdrop}>save</SaveButton>
        </SaveButtonWraper>
      </StyledModal>
      <Backdrop toggleBackdrop={props.toggleBackdrop} />
    </>
  );
};

export default SettingsModal;
