import React, { useState } from "react";
import TasksForm from "./TasksForm";
import Task from "./Task";
import styled from "styled-components";

const Wraper = styled.div`
  max-width: 600px;
  min-height: 30vh;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(230, 230, 230, 0.4);
`;

function TasksList() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
    console.log(newTasks);
  };

  const removeTask = (id) => {
    const removeArr = [...tasks].filter((task) => task.id !== id);

    setTasks(removeArr);
  };

  const updateTask = (taskId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTasks((prev) =>
      prev.map((item) => (item.id === taskId ? newValue : item))
    );
  };

  const completeTask = (id) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Wraper>
      <h1>Tasks</h1>
      <TasksForm onSubmit={addTask} />
      <Task
        tasks={tasks}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </Wraper>
  );
}

export default TasksList;
