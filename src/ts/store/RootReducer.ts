import { Action } from "redux";

import { combineReducers } from "@reduxjs/toolkit";

const placeholderReducer = (state = {}, _action: Action) => {
  // reducer does nothing, it returns the initial state
  // including to statisfy console error
  return state;
};

const rootReducer = combineReducers({
  placeholder: placeholderReducer,
});

export default rootReducer;
