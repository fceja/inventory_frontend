import React from "react";

import { FolderModelI } from "@common/Models"

interface PropsI {
    folders: FolderModelI[];
}

const FolderTree: React.FC<PropsI> = (props) => {
    const { folders } = props;

    // validate root folder values
    const rootFolder = folders.find(folder => folder.parentFolderId === null);
    if (!rootFolder || rootFolder.level !== 0) {
        console.error('Root folder not found or contains invalid values for folder tree.');
        return null;
    }

    const renderFolders = () => {
        const traverseFolders = (folder: FolderModelI, level: string) => {
            const childFolders = folders.filter(child => child.parentFolderId === folder.folderId);

            return (
                <div key={folder.folderId} data-level={level} style={{ marginLeft: 20 }}>
                    {folder.name}
                    {childFolders.map((child, index) => (
                        // pass new bullet level to sub folder
                        <React.Fragment key={index}>
                            {traverseFolders(child, `${level}.${index}`)}
                        </React.Fragment>
                    ))}
                </div>
            );
        };

        // start rendering from the root folder
        return traverseFolders(rootFolder, "0");
    };

    return <div className="folder-tree">{renderFolders()}</div>;
};

export default FolderTree;
