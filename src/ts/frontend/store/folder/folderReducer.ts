import {
    SET_FOLDER_DATA,
    SET_FOLDER_ID,
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
        case SET_FOLDER_DATA:
            return {
                ...state,
                folderId: action.payload.folderId,
                folderName: action.payload.folderName,
                parentFolderId: action.payload.parentFolderId
            }

        case SET_FOLDER_ID:
            return {
                ...state,
                folderId: action.payload.folderId
            }

        case SET_FOLDER_NAME:
            return {
                ...state,
                folderName: action.payload.folderName
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