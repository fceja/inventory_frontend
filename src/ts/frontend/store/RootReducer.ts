import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@store/auth/AuthReducer";
import folderReducer from "@store/folder/FolderReducer"
import itemReducer from "@store/item/ItemReducer"

const rootReducer = combineReducers({
  authState: authReducer,
  folderState: folderReducer,
  itemState: itemReducer
});

export default rootReducer;
