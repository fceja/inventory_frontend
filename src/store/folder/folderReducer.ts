import { FolderActionT } from "@store/folder/folderActions";

interface InitialStateI {
    folderLevel: string | null;
}

const initialState: InitialStateI = {
    folderLevel: null
}

const folderReducer = (state = initialState, action: FolderActionT) => {
    switch (action.type) {
        case "SET_FOLDER_LEVEL":
            return {
                ...state,
                folderLevel: action.payload.folderLevel
            }

        default:
            return state;
    }
}

export default folderReducer