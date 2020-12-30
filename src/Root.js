import React from 'react';

import Navbar from './components/Navbar';
import Timer from './components/Timer';
import TasksList from './components/Tasks/TasksList';

import GlobalStyles from './globalStyles';

import styled from 'styled-components';

const Wraper = styled.div`
  height: 100vh;
`;

const Root = () => (
  <>
    <GlobalStyles />
    <Wraper>
      <Navbar />
      <Timer />
      <TasksList />
    </Wraper>
  </>
);

export default Root;
