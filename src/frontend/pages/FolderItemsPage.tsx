import "@scss/pages/FolderItemsPage.scss"
import FolderNavigation from "@components/folderNavigation/FolderNavigation"
import FolderStats from "@components/folderStats/FolderStats"

const FolderItemsPage = () => {
    return (
        <>
            <FolderNavigation />
            <FolderStats />
        </>
    )
}

export default FolderItemsPage