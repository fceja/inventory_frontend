import "@scss/pages/MainFoldersPage.scss"
import FolderAddNodes from "@components/mainFoldersPage/SelectionMenuAddNodes"
import FolderNavigation from "@components/mainFoldersPage/FolderNavigation"
import FolderContentNodes from "@components/mainFoldersPage/FolderContentNodes"
import FolderStats from "@components/mainFoldersPage/FolderStats"

const MainFoldersPage = () => {
    return (
        <main className="main-folders-page">
            <FolderNavigation />
            <FolderStats />
            <FolderContentNodes />
            <FolderAddNodes />
        </main>
    )
}

export default MainFoldersPage
