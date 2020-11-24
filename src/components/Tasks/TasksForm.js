import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid green;
  padding: 0.5rem;
`;

const StyledButton = styled.button`
  border: none;
  padding: 0.5rem;
  margin-left: 20px;
  border-radius: 4px;
`;

function TasksList(props) {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 1000000),
      text: input,
    });
    setInput("");
  };
  console.log(props.tasks);
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <StyledInput
        type="text"
        placeholder="Add task"
        value={input}
        onChange={handleChange}
        name="text"
        ref={inputRef}
        required
      ></StyledInput>
      <StyledButton>Add task</StyledButton>
    </form>
  );
}

export default TasksList;
