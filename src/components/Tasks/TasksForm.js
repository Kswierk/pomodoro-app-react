import React, { useState, useEffect, useRef } from "react";

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
      <input
        type="text"
        placeholder="Add task"
        value={input}
        onChange={handleChange}
        name="text"
        ref={inputRef}
        required
      ></input>
      <button>Add todo</button>
    </form>
  );
}

export default TasksList;
