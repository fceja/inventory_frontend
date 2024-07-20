import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@store/auth/AuthReducer";
import folderReducer from "@store/folder/FolderReducer"
import itemReducer from "@store/item/ItemReducer"
import modalReducer from "@store/modal/ModalReducer"
import userReducer from "@store/user/UserReducer"

const rootReducer = combineReducers({
  authState: authReducer,
  folderState: folderReducer,
  itemState: itemReducer,
  modalState: modalReducer,
  userState: userReducer
});

export default rootReducer;
