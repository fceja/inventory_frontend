import { useSelector } from 'react-redux'

import "@scss/pages/FolderContentPage.scss"
import { RootState } from "@store/ConfigureStore";
import FolderAddNodes from "@components/mainFoldersPage/FolderAddNodes"
import FolderNavigation from "@components/mainFoldersPage/FolderNavigation"
import FolderContentNodes from "@components/mainFoldersPage/FolderContentNodes"
import ItemModal from "@components/_modals/item/ItemModal"
import FolderStats from "@components/mainFoldersPage/FolderStats"

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
