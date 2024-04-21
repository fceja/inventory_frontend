import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@store/auth/authReducer";
import folderReducer from "@store/folder/folderReducer"
import itemReducer from "@store/item/itemReducer"

const rootReducer = combineReducers({
  authState: authReducer,
  folderState: folderReducer,
  itemState: itemReducer
});

export default rootReducer;
