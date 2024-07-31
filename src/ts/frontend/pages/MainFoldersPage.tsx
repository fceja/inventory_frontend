import { useEffect } from "react"
import { Dispatch } from "redux";
import { useDispatch } from 'react-redux';

import "@scss/pages/MainFoldersPage.scss"
import AddNodeButton from "@components/mainFoldersPage/AddNodeButton"
import { setFolderData, FolderActionT } from "@store/folder/FolderActions";
import FolderNavigation from "@components/mainFoldersPage/FolderNavigation"
import FolderContentNodes from "@components/mainFoldersPage/FolderContentNodes"
import FolderStats from "@components/mainFoldersPage/FolderStats"
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";

const MainFoldersPage = () => {
    const dispatch: Dispatch<FolderActionT | ItemActionT> = useDispatch();

    useEffect(() => {

        /* clear folder and item redux state */
        return () => {
            dispatch(setFolderData({
                folderId: null,
                folderName: null,
                parentFolderId: null
            }))
            dispatch(setSelectedItemId(null))
        }
    }, [])

    return (
        <main className="main-folders-page">
            <FolderNavigation />
            <FolderStats />
            <FolderContentNodes />
            <AddNodeButton />
        </main>
    )
}

export default MainFoldersPage
