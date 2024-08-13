import React from "react"
import { useSelector } from 'react-redux';

import "@scss/components/mainFolderPage/FolderHierarchyNav.scss"
import { RootState } from "@store/ConfigureStore";
import FolderTreeButton from "@components/mainFoldersPage/FolderTreeButton"
import FolderLevelUp from "@components/mainFoldersPage/FolderLevelUp"

const FolderNavigation = React.memo(() => {
    const folderName = useSelector((state: RootState) => state.folderState.folderName);

    return (
        <nav className="folder-hierarchy-nav">
            < FolderTreeButton />
            <span>Current folder: {folderName} </span>
            <FolderLevelUp />
        </nav >
    )
})

export default FolderNavigation