import React, { useState } from 'react';
import TasksForm from './TasksForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import styled from 'styled-components';

const TaskWraper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px 30px;
  padding: 0.3rem;
  border-radius: 4px;
  background-color: rgba(230, 230, 230, 0.4);
`;

const StyledTask = styled.div`
  font-size: 1.1rem;
  margin: 10px 0;
`;

const EditIcon = styled(TiEdit)`
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 20px;
`;
const DeleteIcon = styled(RiCloseCircleLine)`
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 20px;
`;

function Task({ tasks, completeTask, removeTask, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      value: '',
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
        <DeleteIcon onClick={() => removeTask(task.id)} />
        <EditIcon
          onClick={() => setEdit({ id: task.id, value: task.text })}
        />
      </div>
    </TaskWraper>
  ));
}

export default Task;
