import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import styled from "styled-components";
import PropTypes from 'prop-types'; 



const StyledBackdrop = styled.div`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
`;

const Backdrop = (props) => (
  <StyledBackdrop
    onClick={() => {
      props.onBackdropClickLogin();
      props.onBackdropClickSettings();
    }}
  ></StyledBackdrop>
);

const mapDispatchToProps = (dispatch) => {
  return {
    onBackdropClickSettings: () =>
      dispatch({ type: actionTypes.CLOSE_SETTINGS }),
    onBackdropClickLogin: () => dispatch({ type: actionTypes.CLOSE_LOGIN }),
  };
};

Backdrop.propTypes ={
  onBackdropClickLogin: PropTypes.func,
  onBackdropClickSettings: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(Backdrop);
