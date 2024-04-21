import {
    SET_FOLDER_LEVEL,
    SET_CUR_LEVEL_FOLDER_ID,
    SET_PARENT_FOLDER_ID,
    FolderActionT
} from "@store/folder/FolderActions";

const initialState = {
    curLevelFolderId: null,
    parentFolderId: null
}

const folderReducer = (state = initialState, action: FolderActionT) => {
    switch (action.type) {
        case SET_FOLDER_LEVEL:
            return {
                ...state,
                folderLevel: action.payload.folderLevel
            }
        case SET_CUR_LEVEL_FOLDER_ID:
            return {
                ...state,
                curLevelFolderId: action.payload.curLevelFolderId
            }
        case SET_PARENT_FOLDER_ID:
            return {
                ...state,
                parentFolderId: action.payload.parentFolderId
            }

        default:
            return state;
    }
}

export default folderReducer