import "@scss/pages/FolderItemsPage.scss"
import FolderNavigation from "@components/folderNavigation/FolderNavigation"
import FolderStats from "@components/folderStats/FolderStats"
import Folder from "@components/folder/Folder"
import FolderItem from "@components/folderItem/FolderItem"

const FolderItemsPage = () => {
    return (
        <>
            <FolderNavigation />
            <FolderStats />
            <Folder />
            <FolderItem />
        </>
    )
}

export default FolderItemsPage