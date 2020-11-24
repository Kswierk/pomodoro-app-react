import React from "react";

import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import TasksList from "./components/Tasks/TasksList";

import GlobalStyles from "./globalStyles";

const Root = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <Timer />
    <TasksList />
  </>
);

export default Root;
