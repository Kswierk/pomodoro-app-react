import React from "react";

import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import TasksList from "./components/Tasks/TasksList";

import GlobalStyles from "./globalStyles";
import Brief from "./components/Brief/Brief";

const Root = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <Timer />
    <TasksList />
    <Brief />
  </>
);

export default Root;
