import React from "react";

import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import Tasks from "./components/Tasks/Tasks";
import { TimerProvider } from "./context/TimerContext";
import { ResetTimerProvider } from "./context/ResetTimeContext";

import GlobalStyles from "./globalStyles";

const Root = () => (
  <>
    <TimerProvider>
      <ResetTimerProvider>
        <GlobalStyles />
        <Navbar />
        <Timer />
        <Tasks />
      </ResetTimerProvider>
    </TimerProvider>
  </>
);

export default Root;
