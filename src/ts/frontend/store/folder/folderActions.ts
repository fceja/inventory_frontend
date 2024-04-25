export const SET_FOLDER_ID = "SET_FOLDER_ID"
export const SET_FOLDER_NAME = "SET_FOLDER_NAME"
export const SET_PARENT_FOLDER_ID = "SET_PARENT_FOLDER_ID"

interface SetFolderIdAction {
    type: typeof SET_FOLDER_ID;
    payload: { folderId: number | null };
}

interface SetFolderNameAction {
    type: typeof SET_FOLDER_NAME;
    payload: { folderName: string | null };
}

interface SetParentFolderIdAction {
    type: typeof SET_PARENT_FOLDER_ID;
    payload: { parentFolderId: number | null };
}

export type FolderActionT = SetFolderIdAction | SetFolderNameAction | SetParentFolderIdAction

export const setFolderId = (folderId: number | null): FolderActionT => {
    return {
        type: SET_FOLDER_ID,
        payload: { folderId: folderId }
    }
}

export const setFolderName = (folderName: string): FolderActionT => {
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