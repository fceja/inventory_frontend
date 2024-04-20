import FolderHierarchy from "@components/folder/FolderHierarchy"
import FolderOptions from "@components/folder/FolderOptions"

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