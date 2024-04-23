import {
    SET_FOLDER_ID,
    SET_FOLDER_LEVEL,
    SET_FOLDER_NAME,
    SET_PARENT_FOLDER_ID,
    FolderActionT
} from "@store/folder/FolderActions";

const initialState = {
    folderId: null,
    folderName: null,
    parentFolderId: null
}

const folderReducer = (state = initialState, action: FolderActionT) => {
    switch (action.type) {
        case SET_FOLDER_ID:
            return {
                ...state,
                folderId: action.payload.folderId
            }

        case SET_FOLDER_LEVEL:
            return {
                ...state,
                folderLevel: action.payload.folderLevel
            }

        case SET_FOLDER_NAME:
            return {
                ...state,
                folderLevel: action.payload.folderName
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