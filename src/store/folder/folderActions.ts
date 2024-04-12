import { Action } from "redux";

const SET_FOLDER_LEVEL = "SET_FOLDER_LEVEL"

interface SetFolderLevelAction extends Action {
    type: typeof SET_FOLDER_LEVEL;
    payload: { folderLevel: string };
}

export type FolderActionT = SetFolderLevelAction

export const setFolderLevel = (level: string): FolderActionT => {
    return {
        type: SET_FOLDER_LEVEL,
        payload: { folderLevel: level }
    }
}