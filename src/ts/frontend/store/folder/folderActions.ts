export const SET_FOLDER_DATA = "SET_FOLDER_DATA"
export const SET_FOLDER_ID = "SET_FOLDER_ID"
export const SET_FOLDER_NAME = "SET_FOLDER_NAME"
export const SET_PARENT_FOLDER_ID = "SET_PARENT_FOLDER_ID"
export const SET_SELECTED_FOLDER_ID = "SET_SELECTED_FOLDER_ID"
export const SET_SELECTED_FOLDER_NAME = "SET_SELECTED_FOLDER_NAME"

interface PayloadI {
    folderId?: number | null;
    folderName?: string | null;
    parentFolderId?: number | null;
    selectedFolderId?: number | null;
    selectedFolderName?: string | null;
}

interface FolderActionI {
    type: typeof SET_FOLDER_DATA
    | typeof SET_FOLDER_ID
    | typeof SET_FOLDER_NAME
    | typeof SET_PARENT_FOLDER_ID
    | typeof SET_SELECTED_FOLDER_ID
    | typeof SET_SELECTED_FOLDER_NAME
    payload: PayloadI;
}

export type FolderActionT = FolderActionI


export const setFolderData = (payload: PayloadI): FolderActionT => {
    return {
        type: SET_FOLDER_DATA,
        payload: {
            folderId: payload.folderId,
            folderName: payload.folderName,
            parentFolderId: payload.parentFolderId
        }
    }
}

export const setFolderId = (folderId: number | null): FolderActionT => {
    return {
        type: SET_FOLDER_ID,
        payload: { folderId: folderId }
    }
}

export const setFolderName = (folderName: string | null): FolderActionT => {
    return {
        type: SET_FOLDER_NAME,
        payload: { folderName: folderName }
    }
}

export const setParentFolderId = (folderId: number | null): FolderActionT => {
    return {
        type: SET_PARENT_FOLDER_ID,
        payload: { parentFolderId: folderId }
    }
}

export const setSelectedFolderId = (folderId: number | null): FolderActionT => {
    return {
        type: SET_SELECTED_FOLDER_ID,
        payload: { selectedFolderId: folderId }
    }
}

export const setSelectedFolderName = (name: string | null): FolderActionT => {
    return {
        type: SET_SELECTED_FOLDER_NAME,
        payload: { selectedFolderName: name }
    }
}