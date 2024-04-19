export const SET_FOLDER_LEVEL = "SET_FOLDER_LEVEL"
export const SET_CUR_LEVEL_FOLDER_ID = "SET_CUR_LEVEL_FOLDER_ID"
export const SET_PARENT_FOLDER_ID = "SET_PARENT_FOLDER_ID"

interface SetFolderLevelAction {
    type: typeof SET_FOLDER_LEVEL;
    payload: { folderLevel: string };
}

interface SetCurLevelFolderIdAction {
    type: typeof SET_CUR_LEVEL_FOLDER_ID;
    payload: { curLevelFolderId: string | null };
}

interface SetParentFolderIdAction {
    type: typeof SET_PARENT_FOLDER_ID;
    payload: { parentFolderId: string | null };
}

export type FolderActionT = SetFolderLevelAction | SetCurLevelFolderIdAction | SetParentFolderIdAction

export const setFolderLevel = (level: string): FolderActionT => {
    return {
        type: SET_FOLDER_LEVEL,
        payload: { folderLevel: level }
    }
}

export const setCurLevelFolderId = (folderId: string | null): FolderActionT => {
    return {
        type: SET_CUR_LEVEL_FOLDER_ID,
        payload: { curLevelFolderId: folderId }
    }
}

export const setParentFolderId = (folderId: string | null): FolderActionT => {
    return {
        type: SET_PARENT_FOLDER_ID,
        payload: { parentFolderId: folderId }
    }
}