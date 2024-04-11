import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@store/auth/authReducer";
import folderReducer from "@store/folder/folderReducer"

const rootReducer = combineReducers({
  authState: authReducer,
  folderState: folderReducer
});

export default rootReducer;
