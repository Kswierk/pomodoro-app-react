import React from "react";
import styled from "styled-components";
import { BriefText } from "./data";

const Wraper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BriefParts = () => {
  return (
    <Wraper>
      {BriefText.map((item, index) => (
        <>
          <h1 key={index}>{item.header}</h1>
          <p key={index + 1}>{item.text}</p>
        </>
      ))}
    </Wraper>
  );
};

export default BriefParts;
