import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import pomodoro from "./store/reducers/pomodoro";
import uiManagers from "./store/reducers/ui-managers";
import loginManagers from "./store/reducers/auth";

const rootReducer = combineReducers({
  pomo: pomodoro,
  ui: uiManagers,
  login: loginManagers,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
