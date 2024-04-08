import FolderHierarchy from "@components/folderHierarchy/FolderHierarchy"
import FolderOptions from "@components/folderOptions/FolderOptions"

const FolderNavigation = () => {
    return (
        <div className="folder-navigation">
            <FolderHierarchy />
            <span> Items </span>
            <FolderOptions />
        </div>
    )
}

export default FolderNavigation