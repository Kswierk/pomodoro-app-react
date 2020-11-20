import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TaskItems from "./TaskItems";

const Wraper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
`;

const Tasks = (props) => {
  return (
    <Wraper>
      <h1>TASKS</h1>
      <TaskItems />
    </Wraper>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};

export default connect(mapStateToProps, null)(Tasks);
