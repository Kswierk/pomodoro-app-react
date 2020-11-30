import React from "react";
import BriefParts from "./BriefPart";
import styled from "styled-components";

const Wraper = styled.div`
  background-color: #eee;
`;

const StyledHeader = styled.h1`
  text-align: center;
`;

const Brief = () => {
  return (
    <Wraper>
      <StyledHeader>Pomodoro Timer to boost your productivity</StyledHeader>
      <BriefParts />
    </Wraper>
  );
};

export default Brief;
