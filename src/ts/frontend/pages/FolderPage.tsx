import { useEffect, useRef, useState } from "react"
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";

import "@scss/pages/FolderPage.scss"
import { AuthActionT } from "@store/auth/AuthActions";
import { PAGE_PATHS } from "@common/Constants"
import { setFolderData, FolderActionT } from "@store/folder/FolderActions";
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
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [makeActive, setMakeActive] = useState(false);

    let { folderId } = useParams();

    const fetchData = async () => {
        if (folderIdRef.current === null || !(folderIdRef.current >= 0)) return;

        const response = await FoldersApi().getByFolderId(folderIdRef.current);
        if (response && response.status === 200 && response.data.success) {
            setNodeData(response.data.folderNodes);
            dispatch(setFolderData({
                folderId: folderIdRef.current,
                folderName: response.data.folder.name,
                parentFolderId: response.data.folder.parentFolderId
            }))
        }
    }

    const handleAddBtnClick = () => {
        setIsAddBtnClicked(true);
    };

    const handleBtnClose = () => {
        setMakeActive(false);
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
        const btnsDiv = document.querySelector('.btns-container');
        if (!btnsDiv) return;

        if (makeActive) {
            btnsDiv.classList.add('active');
        }

        else {
            btnsDiv.classList.remove('active');
            setTimeout(() => {
                setIsAddBtnClicked(false);
            }, 500)
        }
    }, [makeActive])

    useEffect(() => {
        if (isAddBtnClicked) {
            setMakeActive(true)
        }
    }, [isAddBtnClicked])

    useEffect(() => {
        // determines if folderId param is a number or string
        if (!folderId) return;

        if (isStringANumber(folderId)) processNumber()
        else processString()

        fetchData()

    }, [folderId])

    const handleBtnClicks = (type: string) => {
        if (type === "folder") {
            console.log('adding folder')
        }
        else if (type === "item") {
            console.log('adding item')

        }
        else if (type === "cancel") {
            console.log('canceling')
        }
        else throw new Error('Invalid type.')

        handleBtnClose()
    }

    return (
        <>
            <div className="folder-content">
                {!nodeData ? <NotFoundPage />
                    :
                    <>
                        <FolderNavigation />
                        <FolderStats />
                        <FolderNodes nodeData={nodeData} />
                    </>
                }
            </div>
            {isAddBtnClicked &&
                <div className="btns-container">
                    <button onClick={() => handleBtnClicks('folder')}>Add Folder</button>
                    <button onClick={() => handleBtnClicks('item')}>Add Item</button>
                    <button onClick={() => handleBtnClicks('cancel')}>Cancel</button>
                </div>
            }
            <div className='btn-add' onClick={handleAddBtnClick}>This is other div</div>
        </>
    )
}

export default FolderPage