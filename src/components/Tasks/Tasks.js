import React from "react";
import styled from "styled-components";

const Wraper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Tasks = () => {
  return (
    <Wraper>
      <div>tasks</div>
      <hr />
      <div>task</div>
      <div>add task</div>
    </Wraper>
  );
};

export default Tasks;
