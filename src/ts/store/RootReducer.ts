import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  authState: authReducer,
});

export default rootReducer;
