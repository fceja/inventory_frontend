export const SET_FOLDER_LEVEL = "SET_FOLDER_LEVEL"
export const SET_CUR_LEVEL_FOLDER_ID = "SET_CUR_LEVEL_FOLDER_ID"

interface SetFolderLevelAction {
    type: typeof SET_FOLDER_LEVEL;
    payload: { folderLevel: string };
}

interface SetCurLevelFolderIdAction {
    type: typeof SET_CUR_LEVEL_FOLDER_ID;
    payload: { curLevelFolderId: string };
}

export type FolderActionT = SetFolderLevelAction | SetCurLevelFolderIdAction

export const setFolderLevel = (level: string): FolderActionT => {
    return {
        type: SET_FOLDER_LEVEL,
        payload: { folderLevel: level }
    }
}

export const setCurLevelFolderId = (folderId: string): FolderActionT => {
    return {
        type: SET_CUR_LEVEL_FOLDER_ID,
        payload: { curLevelFolderId: folderId }
    }
}