import React, { useEffect, useState } from "react";

import { FolderModelI } from "@common/Models"

interface PropsI {
    folders: FolderModelI[];
    collapseMode: 'rootOnly'
    collapseId?: string
}

const FolderTree: React.FC<PropsI> = (props) => {
    const { collapseMode, folders } = props;

    const [treeComponents, setTreeComponents] = useState<JSX.Element | null>(null)

    let cachedComponents: HTMLElement[];

    // creates a map with parentFolderIds' as keys,
    // and values witch array containing child folders
    const parentChildMap: Map<number, FolderModelI[]> = new Map<number, FolderModelI[]>();
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

    const generateInitialComponents = (parentFolder: FolderModelI, children: Object[] | undefined) => {
        const childComponents = children?.map((child: any) => {
            return <div
                key={`sub-folder-${child.folderId}`}
                className={"collapsed"}
                id={child.folderId}
                data-parent-id={child.parentFolderId}
                onClick={(event) => handleClick(event)}
                style={{ marginLeft: child.level * 20 }}
            >
                <span>

                    {child.name}
                </span>
            </div>

        })

        setTreeComponents(
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

    const appendGeneratedComponents = (parentFolder: FolderModelI, children: FolderModelI[] | undefined) => {
        const parentDiv = document.getElementById(`${parentFolder.folderId}`)

        const childComponents = children?.map((child: FolderModelI) => {
            const div = document.createElement('div');
            div.className = 'collapsed';
            div.id = String(child.folderId);
            div.setAttribute('data-parent-id', `${child.parentFolderId}`);
            div.style.marginLeft = `${child.level * 20}px`;

            const span = document.createElement('span');

            span.onclick = (event) => handleClick(event as unknown as React.MouseEvent<HTMLDivElement | HTMLSpanElement, MouseEvent>);
            span.textContent = child.name;

            div.appendChild(span);

            return div;
        });

        if (childComponents) {
            childComponents.forEach((child) => {
                parentDiv?.appendChild(child)
            })
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLSpanElement | HTMLDivElement, MouseEvent>) => {
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
            if (cachedComponents && cachedComponents.length > 0) {
                cachedComponents.forEach(component => {
                    const componentParentId = component.getAttribute('data-parent-id')

                    if (parent?.id === componentParentId) {
                        parent.appendChild(component)
                        cachedComponents = cachedComponents.filter((cachedComponent) => cachedComponent.id !== component.id);
                        parent.className = 'expanded'
                    }

                })

            } else {
                const parentFolder = (folders.filter((folder) => String(folder.folderId) === parent.id))[0]
                if (!parentFolder) throw new Error('TODO? - folder do not exist')

                const childFolders = parentChildMap.get(Number(parent.id))

                if (!childFolders) return console.warn('Debug - Child folders do not exist')

                let missing = false
                for (const child of childFolders) {
                    const div = document.getElementById(String(child.folderId))
                    if (!div) {
                        missing = true
                        break
                    }
                }

                if (missing) appendGeneratedComponents(parentFolder, childFolders)
                parent.className = 'expanded'

            }


        } else throw new Error('Logic error.1')

    };

    useEffect(() => {
        if (collapseMode === 'rootOnly') {
            const rootFolder = folders[0];
            if (rootFolder.parentFolderId !== null || rootFolder.level !== 0)
                throw new Error('Root folder not found.')

            const childFolders = parentChildMap.get(0)

            generateInitialComponents(rootFolder, childFolders)
        } else throw new Error('Logic error.')
    }, [])


    return (
        <>
            <div className="folder-tree">
                {treeComponents &&
                    treeComponents}
            </div >
        </>
    )

};

export default FolderTree;
