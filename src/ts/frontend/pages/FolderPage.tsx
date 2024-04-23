import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";

import "@scss/pages/FolderPage.scss"
import { AuthActionT } from "@store/auth/AuthActions";
import { RootState } from "@store/ConfigureStore";
import { PAGE_PATHS } from "@common/Constants"
import { setFolderId, setFolderName, setParentFolderId, FolderActionT } from "@store/folder/FolderActions";
import FoldersApi from "@api/FoldersApi"
import FolderNavigation from "@components/folder/FolderNavigation"
import FolderNodes from "@components/folder/FolderNodes"
import FolderStats from "@components/folder/FolderStats"
import NotFoundPage from "@pages/NotFoundPage";
import { isStringAllZeroes, isStringANumber, pathEndsWithString } from "@utils/string/StringUtils"

const FolderPage = () => {
    const dispatch: Dispatch<AuthActionT | FolderActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);

    const [isValid, setIsValid] = useState(false)
    const [nodeData, setNodeData] = useState(null);

    let { folderId } = useParams();

    useEffect(() => {
        if (!folderId) return setIsValid(false)

        if (folderId === 'main') {
            folderId = '0'
            setIsValid(true)
        }

        else if (isStringAllZeroes(folderId)) {
            window.history.pushState({}, 'Update URL to main', PAGE_PATHS.FOLDERS.replace(':folderId', 'main'));
            folderId = '0'
            setIsValid(true)
        }
        else if (isStringANumber(folderId) && pathEndsWithString(folderId)) {
            setIsValid(true)
        }
        else {
            setIsValid(false)
            return;
        }

        const fetchData = async () => {
            if (!folderId) return;

            const response = await FoldersApi(dispatch, authState).getByFolderId(folderId);
            if (response && response.status === 200 && response.data.success) {
                dispatch(setParentFolderId(response.data.folder.parentFolderId))
                dispatch(setFolderName(response.data.folder.name))
                setNodeData(response.data.folderNodes);
            }
        }
        fetchData();
        dispatch(setFolderId(Number(folderId)))

    }, [folderId])

    return (
        <div className="folder-content">
            {!isValid ? <NotFoundPage />
                :
                <>
                    <FolderNavigation />
                    <FolderStats />
                    <FolderNodes nodeData={nodeData} />
                </>
            }
        </div>
    )
}

export default FolderPage