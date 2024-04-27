export const SET_FOLDER_DATA = "SET_FOLDER_DATA"
export const SET_FOLDER_ID = "SET_FOLDER_ID"
export const SET_FOLDER_NAME = "SET_FOLDER_NAME"
export const SET_PARENT_FOLDER_ID = "SET_PARENT_FOLDER_ID"

interface PayloadI {
    folderId?: number | null;
    folderName?: string | null;
    parentFolderId?: number | null;
}

interface FolderActionI {
    type: typeof SET_FOLDER_DATA | typeof SET_FOLDER_ID | typeof SET_FOLDER_NAME | typeof SET_PARENT_FOLDER_ID;
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