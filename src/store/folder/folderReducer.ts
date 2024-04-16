import {
    SET_FOLDER_LEVEL,
    SET_CUR_LEVEL_FOLDER_ID,
    FolderActionT
} from "@store/folder/folderActions";

const folderReducer = (state = {}, action: FolderActionT) => {
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

        default:
            return state;
    }
}

export default folderReducer