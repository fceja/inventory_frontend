import { useEffect, useRef, useState } from "react"
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";

import "@scss/pages/FolderPage.scss"
import { AuthActionT } from "@store/auth/AuthActions";
import { PAGE_PATHS } from "@common/Constants"
import { setFolderName, setParentFolderId, FolderActionT } from "@store/folder/FolderActions";
import FoldersApi from "@api/FoldersApi"
import FolderNavigation from "@components/folder/FolderNavigation"
import FolderNodes from "@components/folder/FolderNodes"
import FolderStats from "@components/folder/FolderStats"
import NotFoundPage from "@pages/NotFoundPage";
import { isStringAllZeroes, isStringANumber, pathEndsWithString } from "@utils/string/StringUtils"

const FolderPage = () => {
    const dispatch: Dispatch<AuthActionT | FolderActionT> = useDispatch();

    const folderIdRef = useRef<number | null>(null);
    const [nodeData, setNodeData] = useState(null);

    let { folderId } = useParams();

    const fetchData = async () => {
        if (folderIdRef.current === null || !(folderIdRef.current >= 0)) return;

        const response = await FoldersApi().getByFolderId(folderIdRef.current);
        if (response && response.status === 200 && response.data.success) {
            dispatch(setParentFolderId(response.data.folder.parentFolderId))
            dispatch(setFolderName(response.data.folder.name))
            setNodeData(response.data.folderNodes);
        }
    }

    const processNumber = () => {
        // handles operations if folderId param is a number
        if (!folderId) return;

        if (isStringAllZeroes(folderId)) {
            window.history.pushState({}, 'Update URL to main', PAGE_PATHS.FOLDERS.replace(':folderId', 'main'));
            folderIdRef.current = 0

            fetchData()
        }
        else if (isStringANumber(folderId) && pathEndsWithString(folderId)) {
            folderIdRef.current = Number(folderId)

            fetchData()
        }
    }

    const processString = () => {
        // handles operations if folderId param is a string
        if (!folderId) return;

        if (folderId === 'main') {
            folderIdRef.current = 0

            fetchData()
        }
    }

    useEffect(() => {
        // determines if folderId param is a number or string
        if (!folderId) return;

        if (isStringANumber(folderId)) processNumber()
        else processString()

    }, [folderId])

    return (
        <div className="folder-content">
            {!nodeData ? <NotFoundPage />
                :
                <>
                    <FolderNavigation />
                    <FolderStats folderId={Number(folderIdRef.current)} />
                    <FolderNodes nodeData={nodeData} />
                </>
            }
        </div>
    )
}

export default FolderPage