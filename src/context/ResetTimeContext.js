import React, { useState, createContext } from "react";

export const ResetTimeContext = createContext();

export const ResetTimerProvider = (props) => {
  const [pickedTimeSet, setPickedTimeSet] = useState(1500);
  return (
    <ResetTimeContext.Provider value={[pickedTimeSet, setPickedTimeSet]}>
      {props.children}
    </ResetTimeContext.Provider>
  );
};
