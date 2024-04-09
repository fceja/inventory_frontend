import FolderHierarchy from "@components/folderHierarchy/FolderHierarchy"
import FolderOptions from "@components/folderOptions/FolderOptions"

const FolderNavigation = () => {
    return (
        <div className="folder-nav">
            <FolderHierarchy />
            <span> Items </span>
            <FolderOptions />
        </div>
    )
}

export default FolderNavigation