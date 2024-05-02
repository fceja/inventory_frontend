import React from "react";

import { FolderModelI } from "@common/Models"

interface PropsI {
    folders: FolderModelI[];
}

const FolderTree: React.FC<PropsI> = (props) => {

    const { folders } = props

    const renderFolders = () => {
        const result = [];
        const stack: { folder: FolderModelI, level: number }[] = [];

        // verify first folder index contains expected root values
        const rootFolder = folders[0]
        if (rootFolder.parentFolderId !== null || rootFolder.level !== 1) {
            console.error('Root contains invalid values for folder tree.');
            return null;
        }

        // push root folder onto the stack
        stack.push({ folder: rootFolder, level: 0 });

        // iterate over folders until all sub directors are added
        while (stack.length > 0) {
            const item = stack.pop();
            if (item) {
                const { folder, level } = item;

                // add sub folder to results
                result.push(<div key={folder.folderId} style={{ marginLeft: level * 20 }}>{folder.name}</div>);

                // add sub folder onto stack to iterate over
                const childFolders = folders.filter(child => child.parentFolderId === folder.folderId);
                for (let i = childFolders.length - 1; i >= 0; i--) {
                    stack.push({ folder: childFolders[i], level: level + 1 });
                }
            } else break
        }

        return result;
    };

    return <div>{renderFolders()}</div>;
};


export default FolderTree;
