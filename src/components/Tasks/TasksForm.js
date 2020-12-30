import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BiPlusCircle, BiCheckCircle } from 'react-icons/bi';
const StyledForm = styled.form`
  position: relative;
  /* margin: 0 auto; */
  /* background-color: #eee; */
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  margin: 0 30px 20px 30px;
  overflow: hidden;
`;

const AddIcon = styled(BiPlusCircle)`
  font-size: 1.5rem;
  color: #fff;
`;
const CheckedIcon = styled(BiCheckCircle)`
  font-size: 1.5rem;
  color: #fff;
`;

const StyledLabel = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0;
  pointer-events: none;
  border-bottom: 1px solid #fdfdfd;

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    bottom: -1px;
    border-bottom: 3px solid #fdfdfd;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
`;

const StyledSpan = styled.span`
  position: absolute;
  bottom: 5px;
  left: 5px;
  transition: all 0.3s ease;
`;

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  margin-top: 20px;
  height: 40px;
  width: 100%;
  font-size: 1rem;
  color: #fff;

  &:focus {
    outline: none;
  }

  &:focus
    + ${StyledLabel}
    > ${StyledSpan},
    &:valid
    + ${StyledLabel}
    > ${StyledSpan} {
    transform: translateY(-150%);
    font-size: 0.8rem;
  }

  &:focus + ${StyledLabel}::after, &:valid + ${StyledLabel}::after {
    transform: translateX(0%);
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  border-radius: 4px;
  border: none;
  padding: 0 20px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

function TasksList(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  // const inputRef = useRef(null);
  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 1000000),
      text: input,
    });
    setInput('');
  };
  return (
    <StyledForm autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
      {props.edit ? (
        <>
          <StyledInput
            type="text"
            value={input}
            onChange={handleChange}
            name="text"
            // ref={inputRef}
            required
          ></StyledInput>
          <StyledLabel>
            <StyledSpan>Edit</StyledSpan>
          </StyledLabel>
          <StyledButton>
            <CheckedIcon />
          </StyledButton>
        </>
      ) : (
        <>
          <StyledInput
            type="text"
            value={input}
            onChange={handleChange}
            name="text"
            // ref={inputRef}
            required
          ></StyledInput>
          <StyledLabel>
            <StyledSpan>Add task</StyledSpan>
          </StyledLabel>
          <StyledButton>
            <AddIcon />
          </StyledButton>
        </>
      )}
    </StyledForm>
  );
}

TasksList.propTypes = {
  edit: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default TasksList;
