import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

const TaskItems = (props) => {
  const toDoList = props.tasks.length ? (
    props.tasks.map((task) => {
      return (
        <div key={task.id}>
          <span onClick={() => props.onDeleteTask(task.id)}>{task.title}</span>
        </div>
      );
    })
  ) : (
    <p>You have no todos left</p>
  );
  return <div>{toDoList}</div>;
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteTask: (id) =>
      dispatch({ type: actionTypes.DELETE_TASK, payload: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItems);
