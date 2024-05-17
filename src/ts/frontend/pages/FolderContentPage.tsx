import { useState } from "react"
import { useSelector } from 'react-redux'

import "@scss/pages/FolderContentPage.scss"
import { RootState } from "@store/ConfigureStore";
import FolderAddNodes from "@components/folder/FolderAddNodes"
import FolderContentFetchData from "@components/folder/FolderContentFetchData"
import FolderNavigation from "@components/folder/FolderNavigation"
import FolderContentNodes from "@components/folder/FolderContentNodes"
import ItemModal from "@components/modals/ItemModal"
import FolderStats from "@components/folder/FolderStats"
import FolderTree from "@components/folder/FolderTree"

const FolderContentPage = () => {
    const { isItemModalOpen } = useSelector((state: RootState) => state.modalState);
    const [folderContentResults, setFolderContentResults] = useState<{
        folder: any | null,
        folderNodes: any[] | null
    }>({
        folder: null,
        folderNodes: null
    })

    const handleDataReceived = ({ folder, folderNodes }: { folder: any | null, folderNodes: any[] | null }) => {
        setFolderContentResults({ folder: folder, folderNodes: folderNodes });
    };

    return (
        <>
            <div className="folder-content-page">
                <FolderContentFetchData onDataReceived={handleDataReceived} />
                <FolderNavigation />
                <FolderStats />
                <FolderContentNodes nodeData={folderContentResults} />
                <FolderAddNodes />
            </div>
            {
                isItemModalOpen &&
                <ItemModal />
            }
            {/* <FolderTree /> */}
        </>
    )
}

export default FolderContentPage
