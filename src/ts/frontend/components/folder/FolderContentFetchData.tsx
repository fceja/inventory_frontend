import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";

import { PAGE_PATHS } from "@common/Constants"
import { setFolderData, FolderActionT } from "@store/folder/FolderActions";
import FoldersApi from "@api/FoldersApi"
import { isStringAllZeroes, isStringANumber, pathEndsWithString } from "@utils/string/StringUtils"

interface Props {
    onDataReceived: (data: { folder: any, folderNodes: any }) => void
}

const FolderContentFetchData: React.FC<Props> = ({ onDataReceived }) => {
    const dispatch: Dispatch<FolderActionT> = useDispatch();
    const navigate = useNavigate();

    const { folderId } = useParams();
    const folderIdRef = useRef<number | null>(null);

    const fetchData = async () => {
        if (folderIdRef.current === null || !(folderIdRef.current >= 0)) return;

        try {
            const response = await FoldersApi().getByFolderId(folderIdRef.current);
            if (response && response.status === 200 && response.data.success) {
                onDataReceived(response.data)
                dispatch(setFolderData({
                    folderId: folderIdRef.current,
                    folderName: response.data.folder.name,
                    parentFolderId: response.data.folder.parentFolderId
                }))

            }
            else {
                navigate("/not-found");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const processNumber = () => {

        // handles operations if folderId param is a number
        if (!folderId) return;

        if (isStringAllZeroes(folderId)) {
            window.history.pushState({}, 'Update URL to main', PAGE_PATHS.FOLDERS.replace(':folderId', 'main'));
            folderIdRef.current = 0
        }
        else if (isStringANumber(folderId) && pathEndsWithString(folderId)) {
            folderIdRef.current = Number(folderId)
        }
    }

    const processString = () => {
        // handles operations if folderId param is a string
        if (!folderId) return;

        if (folderId === 'main') folderIdRef.current = 0
    }

    useEffect(() => {
        // determines if folderId param is a number or string
        if (!folderId) return;

        if (isStringANumber(folderId)) processNumber()
        else processString()

        fetchData()

    }, [folderId])

    return null;
}
export default FolderContentFetchData
