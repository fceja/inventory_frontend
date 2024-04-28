import {
    SET_FOLDER_DATA,
    SET_FOLDER_ID,
    SET_FOLDER_NAME,
    SET_PARENT_FOLDER_ID,
    SET_SELECTED_FOLDER_ID,
    SET_SELECTED_FOLDER_NAME,
    FolderActionT
} from "@store/folder/FolderActions";

const initialState = {
    folderId: null,
    folderName: null,
    parentFolderId: null,
    selectedFolderId: null,
    selectedFolderName: null
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

        case SET_SELECTED_FOLDER_ID:
            return {
                ...state,
                selectedFolderId: action.payload.selectedFolderId
            }

        case SET_SELECTED_FOLDER_NAME:
            return {
                ...state,
                selectedFolderName: action.payload.selectedFolderName
            }

        default:
            return state;
    }
}

export default folderReducer