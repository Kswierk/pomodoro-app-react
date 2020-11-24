import React, { useState } from "react";
import TasksForm from "./TasksForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

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
    <div key={index}>
      <div key={task.id} onClick={() => completeTask(task.id)}>
        {task.text}
      </div>
      <div>
        <RiCloseCircleLine onClick={() => removeTask(task.id)} />
        <TiEdit onClick={() => setEdit({ id: task.id, value: task.text })} />
      </div>
    </div>
  ));
}

export default Task;
