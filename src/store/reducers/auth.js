import * as actionTypes from "../actions";

const initialState = {
  isLoginModalOpen: false,
};

const loginManagers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        isLoginModalOpen: !state.isLoginModalOpen,
      };
    case actionTypes.CLOSE_LOGIN:
      return {
        ...state,
        isLoginModalOpen: false,
      };

    default:
      return state;
  }
};

export default loginManagers;
