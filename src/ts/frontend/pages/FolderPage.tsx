import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";

import "@scss/pages/FolderPage.scss"
import { AuthActionT } from "@store/auth/AuthActions";
import { PAGE_PATHS } from "@common/Constants"
import { setCurLevelFolderId, FolderActionT } from "@store/folder/FolderActions";
import FolderNavigation from "@components/folder/FolderNavigation"
import FolderNodes from "@components/folder/FolderNodes"
import FolderStats from "@components/folder/FolderStats"
import NotFoundPage from "@pages/NotFoundPage";

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


const FolderPage = () => {
    let { folderId } = useParams();
    const [isValid, setIsValid] = useState(false)
    const dispatch: Dispatch<AuthActionT | FolderActionT> = useDispatch();

    useEffect(() => {
        if (!folderId) return setIsValid(false)

        if (folderId === 'main') {
            dispatch(setCurLevelFolderId('0'))
            setIsValid(true)
        }

        else if (isStringAllZeroes(folderId)) {
            window.history.pushState({}, 'Update URL to main', PAGE_PATHS.FOLDERS.replace(':folderId', 'main'));
            dispatch(setCurLevelFolderId('0'))
            setIsValid(true)
        }
        else if (isStringANumber(folderId) && pathEndsWithString(folderId)) {
            dispatch(setCurLevelFolderId(folderId))
            setIsValid(true)
        }
        else {
            dispatch(setCurLevelFolderId(null))
            setIsValid(false)
        }

    }, [folderId])

    return (
        <div className="folder-content">
            {!isValid ? <NotFoundPage />
                :
                <>
                    <FolderNavigation />
                    <FolderStats />
                    <FolderNodes />
                </>
            }
        </div>
    )
}

export default FolderPage