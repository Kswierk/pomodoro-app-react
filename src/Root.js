import React from "react";

import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import Tasks from "./components/Tasks/Tasks";

import GlobalStyles from "./globalStyles";

const Root = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <Timer />
    <Tasks />
  </>
);

export default Root;
