import React, { useState } from "react";
import TasksForm from "./TasksForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import styled from "styled-components";

const TaskWraper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: lavender;
`;

const StyledTask = styled.div`
  font-size: 1.1rem;
  margin: 10px 0;
`;

function Task({ tasks, completeTask, removeTask, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TasksForm edit={edit} onSubmit={submitUpdate} />;
  }
  return tasks.map((task, index) => (
    <TaskWraper key={index}>
      <StyledTask key={task.id} onClick={() => completeTask(task.id)}>
        {task.text}
      </StyledTask>
      <div>
        <RiCloseCircleLine onClick={() => removeTask(task.id)} />
        <TiEdit onClick={() => setEdit({ id: task.id, value: task.text })} />
      </div>
    </TaskWraper>
  ));
}

export default Task;
