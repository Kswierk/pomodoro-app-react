import * as actionTypes from "../actions";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "read the book",
    },
    {
      id: 2,
      title: "wash the car",
    },
    {
      id: 3,
      title: "code",
    },
  ],
  taskTitle: "",
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return {
        ...state,
        tasksList: state.tasks.push({
          id: new Date(),
          title: action.payload,
        }),
      };
    case actionTypes.SET_TASK:
      return {
        ...state,
        taskTitle: action.payload,
      };
    case actionTypes.DELETE_TASK:
      const updatedArray = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: updatedArray,
      };
    default:
      return state;
  }
};

export default tasks;
