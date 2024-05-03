import React, { useEffect, useState } from "react";

import { FolderModelI } from "@common/Models"

interface PropsI {
    folders: FolderModelI[];
    collapseMode: 'rootOnly' | 'all' | 'upToId'
    collapseId?: string
}

const FolderTree: React.FC<PropsI> = (props) => {
    const { collapseMode, folders } = props;

    const [components, setComponents] = useState<JSX.Element | null>(null)

    let cachedComponents: HTMLElement[];

    // creates a map with parentFolderIds' as keys,
    // and values witch array containing child folders
    const parentChildMap: Map<number, Object[]> = new Map<number, Object[]>();
    for (const folder of folders) {
        if (folder.parentFolderId === null && folder.level === 0) {
            parentChildMap.set(folder.folderId, [])
            continue
        }
        else if (folder.parentFolderId !== null && folder.parentFolderId >= 0) {
            if (!parentChildMap.has(folder.parentFolderId)) {
                parentChildMap.set(folder.parentFolderId, [])
            }

            parentChildMap.get(folder.parentFolderId)?.push(
                {
                    folderId: folder.folderId,
                    name: folder.name,
                    parentFolderId: folder.parentFolderId,
                    level: folder.level
                }
            )

        } else throw new Error('Logic error.')
    }

    const generateComponents = (parentFolder: FolderModelI, children: Object[] | undefined) => {
        const childComponents = children?.map((child: any) => {
            return <div
                key={`sub-folder-${child.folderId}`}
                id={child.folderId}
                style={{ marginLeft: child.level * 20 }}
            >
                {child.name}
            </div>

        })

        setComponents(
            <div
                className="expanded"
                id={String(parentFolder.folderId)}
            >
                <span
                    onClick={(event) => handleClick(event)}
                >
                    {parentFolder.name}
                </span>
                {childComponents}
            </div>
        )
    };

    const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const parent = (event.target as HTMLElement).parentElement;

        if (!parent) return

        if (parent.className === 'expanded') {
            // add child nodes to cachedComponents
            // then, remove child nodes from parentNode
            cachedComponents = Array.from(parent.childNodes)
                .filter((child) => child.nodeType === Node.ELEMENT_NODE &&
                    (child as HTMLElement).tagName === 'DIV') as HTMLElement[];

            Array.from(parent.childNodes).forEach(child => {
                if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName === 'DIV') {
                    parent.removeChild(child);
                }
            });

            parent.className = 'collapsed'

        } else if (parent.className === 'collapsed') {
            // append cachedComponents to parentNode
            // then, clear cachedComponents
            cachedComponents.forEach(component =>
                parent.appendChild(component)
            )

            cachedComponents = []
            parent.className = 'expanded'

        } else throw new Error('Logic error.')

    };

    useEffect(() => {
        if (collapseMode === 'rootOnly') {
            const rootFolder = folders[0];
            if (rootFolder.parentFolderId !== null || rootFolder.level !== 0)
                throw new Error('Root folder not found.')

            const childFolders = parentChildMap.get(0)

            generateComponents(rootFolder, childFolders)
        } else throw new Error('Logic error.')
    }, [])


    return (
        <>
            <div className="folder-tree">
                {components &&
                    components}
            </div >
        </>
    )

};

export default FolderTree;
