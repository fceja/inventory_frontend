import "@scss/pages/FolderItemsPage.scss"
import FolderNavigation from "@components/folderNavigation/FolderNavigation"
import FolderStats from "@components/folderStats/FolderStats"
import FolderNodes from "@components/folderNodes/FolderNodes"

const FolderItemsPage = () => {
    return (
        <>
            <FolderNavigation />
            <FolderStats />
            <FolderNodes />
        </>
    )
}

export default FolderItemsPage