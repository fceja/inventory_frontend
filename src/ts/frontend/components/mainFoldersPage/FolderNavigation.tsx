import React from "react"
import { useSelector } from 'react-redux';

import { RootState } from "@store/ConfigureStore";
import FolderHierarchy from "@components/mainFoldersPage/FolderHierarchy"
import FolderOptions from "@components/mainFoldersPage/FolderOptions"

const FolderNavigation = React.memo(() => {
    const folderName = useSelector((state: RootState) => state.folderState.folderName);

    return (
        <div className="folder-nav">
            <FolderHierarchy />
            <span> {folderName} </span>
            <FolderOptions />
        </div>
    )
})

export default FolderNavigation