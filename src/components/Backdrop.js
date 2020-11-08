import React from "react";
import styled from "styled-components";

const StyledBackdrop = styled.div`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
`;

const Backdrop = (props) => (
  <StyledBackdrop onClick={props.toggleBackdrop}></StyledBackdrop>
);

export default Backdrop;
