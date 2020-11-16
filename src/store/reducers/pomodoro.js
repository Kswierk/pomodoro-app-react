import * as actionTypes from "../actions";

const initialState = {
  time: 1500,
  currentSessionTimeLeft: 2,

  shortBreakTime: 300,
  shortBreakTimeLeft: 300,

  longBreakTime: 900,
  longBreakTimeLeft: 900,

  chosenTimer: "pomodoro",
};

const pomodoro = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TIMER:
      return {
        ...state,
        time: action.payload * 60,
      };
    case actionTypes.SET_CURRENT_SEESION:
      return {
        ...state,
        currentSessionTimeLeft: action.payload * 60,
      };
    case actionTypes.SET_SHORTBREAK:
      return {
        ...state,
        shortBreakTime: action.payload * 60,
      };
    case actionTypes.SET_SHORTBREAK_SESSION:
      return {
        ...state,
        shortBreakTimeLeft: action.payload * 60,
      };
    case actionTypes.SET_LONGBREAK:
      return {
        ...state,
        longBreakTime: action.payload * 60,
      };
    case actionTypes.SET_LONGBREAK_SESSION:
      return {
        ...state,
        longBreakTimeLeft: action.payload * 60,
      };
    case actionTypes.CHOOSE_TIMER:
      return {
        ...state,
        chosenTimer: action.payload,
      };
    case actionTypes.DECREMENT_TIMER:
      return {
        ...state,
        currentSessionTimeLeft: state.currentSessionTimeLeft - 1,
      };
    case actionTypes.DECREMENT_SHORTBREAK:
      return {
        ...state,
        shortBreakTimeLeft: state.shortBreakTimeLeft - 1,
      };
    case actionTypes.DECREMENT_LONGBREAK:
      return {
        ...state,
        longBreakTimeLeft: state.longBreakTimeLeft - 1,
      };
    case actionTypes.RESET_TIMER:
      return {
        ...state,
        currentSessionTimeLeft: state.time,
        shortBreakTimeLeft: state.shortBreakTime,
        longBreakTimeLeft: state.longBreakTime,
      };
    default:
      return state;
  }
};

export default pomodoro;
