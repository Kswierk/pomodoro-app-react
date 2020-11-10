import React, { useState, createContext } from "react";

export const TimerContext = createContext();

export const TimerProvider = (props) => {
  const [sessionTimeSet, setTimeSessionSet] = useState(1500);
  // const [pickedTimeSet, setPickedTimeSet] = useState(1500);
  return (
    <TimerContext.Provider value={[sessionTimeSet, setTimeSessionSet]}>
      {props.children}
    </TimerContext.Provider>
  );
};
