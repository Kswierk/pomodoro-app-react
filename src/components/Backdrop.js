import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
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
  <StyledBackdrop onClick={props.onToggleModal}></StyledBackdrop>
);

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: () => dispatch({ type: actionTypes.TOGGLE_MODAL }),
  };
};

export default connect(null, mapDispatchToProps)(Backdrop);
