export const SET_FOLDER_ID = "SET_FOLDER_ID"
export const SET_FOLDER_LEVEL = "SET_FOLDER_LEVEL"
export const SET_FOLDER_NAME = "SET_FOLDER_NAME"
export const SET_PARENT_FOLDER_ID = "SET_PARENT_FOLDER_ID"

interface SetFolderIdAction {
    type: typeof SET_FOLDER_ID;
    payload: { folderId: string | null };
}

interface SetFolderLevelAction {
    type: typeof SET_FOLDER_LEVEL;
    payload: { folderLevel: string };
}

interface SetFolderNameAction {
    type: typeof SET_FOLDER_NAME;
    payload: { folderName: string };
}

interface SetParentFolderIdAction {
    type: typeof SET_PARENT_FOLDER_ID;
    payload: { parentFolderId: string | null };
}

export type FolderActionT = SetFolderIdAction | SetFolderNameAction | SetFolderLevelAction | SetParentFolderIdAction

export const setFolderId = (folderId: string | null): FolderActionT => {
    return {
        type: SET_FOLDER_ID,
        payload: { folderId: folderId }
    }
}

export const setFolderName = (level: string): FolderActionT => {
    return {
        type: SET_FOLDER_NAME,
        payload: { folderName: level }
    }
}

export const setFolderLevel = (level: string): FolderActionT => {
    return {
        type: SET_FOLDER_LEVEL,
        payload: { folderLevel: level }
    }
}

export const setParentFolderId = (folderId: string | null): FolderActionT => {
    return {
        type: SET_PARENT_FOLDER_ID,
        payload: { parentFolderId: folderId }
    }
}