import React, { useState } from "react";

import { FolderModelI } from "@common/Models"

interface PropsI {
    folders: FolderModelI[];
    collapseMode: 'rootOnly' | 'all' | 'upToId'
    collapseId?: string
}

const FolderTree: React.FC<PropsI> = (props) => {
    const { folders, collapseMode, collapseId } = props;

    const [collapsedFolders, setCollapsedFolders] = useState<string[]>([]);


    // validate root folder values
    const rootFolder = folders.find(folder => folder.parentFolderId === null);
    if (!rootFolder || rootFolder.level !== 0) {
        console.error('Root folder not found or contains invalid values for folder tree.');
        return null;
    }


    const toggleCollapse = (folderId: string) => {
        setCollapsedFolders((prevCollapsedFolders) =>
            prevCollapsedFolders.includes(folderId)
                ? prevCollapsedFolders.filter((id) => id !== folderId)
                : [...prevCollapsedFolders, folderId]
        );
    };

    const isCollapsed = (folderId: string) => {
        switch (collapseMode) {
            case 'rootOnly':
                return folderId !== String(rootFolder.folderId);
            case 'all':
                return false;
            case 'upToId':
                return collapseId && folderId !== collapseId;

            default:
                throw new Error('Logic error.')
        }
    }

    const renderFolders = () => {
        const traverseFolders = (folder: FolderModelI, level: string) => {
            const childFolders = folders.filter(child => child.parentFolderId === folder.folderId);

            return (
                <div
                    key={`folder-${folder.folderId}`}
                    data-level={level}
                    style={{ marginLeft: 20 }}>

                    <div
                        onClick={() => toggleCollapse(String(folder.folderId))}
                    >
                        {folder.name} {childFolders.length > 0 && `(${collapsedFolders.includes(String(folder.folderId)) ? '+' : '-'})`}
                    </div>

                    {
                        !collapsedFolders.includes(String(folder.folderId)) &&
                        childFolders.map((child, index) => (
                            <React.Fragment
                                key={index}
                            >{traverseFolders(child, `${level}.${index}`)}</React.Fragment>
                        ))
                    }
                </div>
            );

        };

        return traverseFolders(rootFolder, "0");
    };

    return <div className="folder-tree">{renderFolders()}</div>;
};

export default FolderTree;
