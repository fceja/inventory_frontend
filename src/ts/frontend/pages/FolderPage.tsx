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

    const [isANumber, setIsANumber] = useState(false);
    const [isAString, setIsAString] = useState(false);
    const [isValid, setIsValid] = useState(false)
    const [nodeData, setNodeData] = useState(null);

    const [finalFolderId, setFinalFolderId] = useState("");
    let { folderId } = useParams();

    useEffect(() => {
        // determines if folderId param is a number or string
        if (!folderId) {
            setIsANumber(false)
            setIsAString(false)
            setIsValid(false)

            return;
        }

        if (isStringANumber(folderId)) {
            setIsAString(false)
            setIsANumber(true)

        } else {
            setIsANumber(false)
            setIsAString(true)
        }

    }, [folderId])

    useEffect(() => {
        // handles operations if folderId param is a number
        if (!folderId || !isANumber) return;

        if (isStringAllZeroes(folderId)) {
            window.history.pushState({}, 'Update URL to main', PAGE_PATHS.FOLDERS.replace(':folderId', 'main'));
            setFinalFolderId("0")
            setIsValid(true)
        }
        else if (isStringANumber(folderId) && pathEndsWithString(folderId)) {
            setFinalFolderId(folderId)
            setIsValid(true)
        }
        else return setIsValid(false);

    }, [folderId, isANumber])

    useEffect(() => {
        // handles operations if folderId param is a string
        if (!folderId || !isAString) return;

        if (folderId === 'main') {
            setFinalFolderId("0")
            setIsValid(true)
        }
        else return setIsValid(false);

    }, [folderId, isAString])

    useEffect(() => {
        // if valid, handles api call
        if (!isValid || !finalFolderId) return;

        const fetchData = async () => {
            const response = await FoldersApi(dispatch, authState).getByFolderId(finalFolderId);
            if (response && response.status === 200 && response.data.success) {
                dispatch(setParentFolderId(response.data.folder.parentFolderId))
                dispatch(setFolderName(response.data.folder.name))
                setNodeData(response.data.folderNodes);
            }
        }
        fetchData();
        dispatch(setFolderId(Number(finalFolderId)))

    }, [isValid, finalFolderId])

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