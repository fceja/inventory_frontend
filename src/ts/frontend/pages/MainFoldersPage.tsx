import { useSelector } from 'react-redux'

import "@scss/pages/FolderContentPage.scss"
import { RootState } from "@store/ConfigureStore";
import FolderAddNodes from "@components/folder/FolderAddNodes"
import FolderNavigation from "@components/folder/FolderNavigation"
import FolderContentNodes from "@components/folder/FolderContentNodes"
import ItemModal from "@components/modals/ItemModal"
import FolderStats from "@components/folder/FolderStats"

const MainFoldersPage = () => {
    const { isItemModalOpen } = useSelector((state: RootState) => state.modalState);

    return (
        <>
            <div className="folder-content-page">
                <FolderNavigation />
                <FolderStats />
                <FolderContentNodes />
                <FolderAddNodes />
            </div>
            {isItemModalOpen && <ItemModal />}
        </>
    )
}

export default MainFoldersPage
