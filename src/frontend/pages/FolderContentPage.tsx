import "@scss/pages/FolderItemsPage.scss"
import FolderNavigation from "@components/folderNavigation/FolderNavigation"
import FolderStats from "@components/folderStats/FolderStats"
import FolderNodes from "@components/folderNodes/FolderNodes"

const FolderContentPage = () => {
    return (
        <div className="folder-content">
            <FolderNavigation />
            <FolderStats />
            <FolderNodes />
        </div>
    )
}

export default FolderContentPage