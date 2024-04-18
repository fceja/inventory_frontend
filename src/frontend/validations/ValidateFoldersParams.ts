import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";

import { AuthActionT } from "@store/auth/authActions";
import { PAGE_PATHS } from "@common/Constants"
import { setCurLevelFolderId, FolderActionT } from "@store/folder/folderActions";

const isStringAllZeroes = (inputString: string) => {
    return /^0+$/.test(inputString)
}

const isStringANumber = (inputString: string) => {
    return !isNaN(parseFloat(inputString)) && isFinite(+inputString)
}

const pathEndsWithString = (inputString: string) => {
    const path = window.location.pathname
    return path.endsWith(`/${inputString}`) || path.endsWith(`/${inputString}/`)
}

export const validateAndDispatchFolderRoute = () => {
    let { folderId } = useParams();
    const dispatch: Dispatch<AuthActionT | FolderActionT> = useDispatch();

    if (!folderId) return false
    if (folderId === 'main') {
        dispatch(setCurLevelFolderId('0'))

        return true
    }

    else if (isStringAllZeroes(folderId)) {
        window.history.pushState({}, 'Update URL to main', PAGE_PATHS.FOLDERS.replace(':folderId', 'main'));
        dispatch(setCurLevelFolderId('0'))

        return true
    }
    else if (isStringANumber(folderId) && pathEndsWithString(folderId)) {
        dispatch(setCurLevelFolderId(folderId))

        return true
    }
    else {
        dispatch(setCurLevelFolderId(null))

        return false
    }
}
