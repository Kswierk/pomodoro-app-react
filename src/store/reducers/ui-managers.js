import * as actionTypes from "../actions";

const initialState = {
  darkmode: false,
  blockmodal: false,
  isModalOpen: false,
};

const uiManagers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DARKMODE:
      return {
        ...state,
        darkmode: !state.darkmode,
      };
    case actionTypes.SETBLOCK_MODAL:
      return {
        ...state,
        blockmodal: action.payload,
      };
    case actionTypes.TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    default:
      return state;
  }
};

export default uiManagers;
