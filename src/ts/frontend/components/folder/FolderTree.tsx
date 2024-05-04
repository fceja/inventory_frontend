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

    // creates a map with parentFolderIds' as keys
    // values are an array containing child folders
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

    const doesComponentExistInCache = (parentNode: HTMLElement) => {
        if (!cachedComponents) return false;

        for (const component of cachedComponents) {
            const cachedComponentParentId = component.getAttribute('data-parent-id')
            if (parentNode?.id === cachedComponentParentId) {
                return true
            }
        }

        return false

    }

    const appendCachedComponent = (parentNode: HTMLElement) => {
        for (const component of cachedComponents) {
            parentNode.appendChild(component);
        }
    }

    const appendGeneratedComponents = (parentFolder: FolderModelI, children: FolderModelI[] | undefined) => {
        const parentDiv = document.getElementById(`${parentFolder.folderId}`)

        let childLevel = 0
        const childComponents = children?.map((child: FolderModelI) => {
            const className = isLeafOrHasSubFolders(child)

            const div = document.createElement('div');
            div.className = className;
            div.id = String(child.folderId);
            div.setAttribute('data-parent-id', `${child.parentFolderId}`);
            div.setAttribute('data-level', `${parentDiv?.getAttribute('data-level')}.${childLevel}`);
            div.style.marginLeft = `${child.level * 20}px`;


            const span = document.createElement('span');
            span.onclick = (event) => handleClick(event as unknown as React.MouseEvent<HTMLDivElement | HTMLSpanElement, MouseEvent>);
            span.textContent = child.name;

            div.appendChild(span);

            childLevel++

            return div;
        });

        if (childComponents) {
            childComponents.forEach((child) => {
                parentDiv?.appendChild(child)
            })
        }
    };

    const generateComponent = (parentNode: HTMLElement) => {
        const parentFolder = (folders.filter((folder) => String(folder.folderId) === parentNode.id))[0]
        if (!parentFolder) throw new Error('Expected parent folder to exist.')

        const childFolders = parentChildMap.get(Number(parentNode.id))
        if (!childFolders) throw new Error('Expected child folders to exist.')

        let missing = false
        for (const child of childFolders) {
            const div = document.getElementById(String(child.folderId))
            if (!div) {
                missing = true
                break
            }
        }

        if (missing) appendGeneratedComponents(parentFolder, childFolders)
        else throw new Error('Expected missing to be true.')
    }

    const generateRootComponents = (parentFolder: FolderModelI, children: Object[] | undefined) => {
        let rootLevel = 0
        let childLevel = 0
        const childComponents = children?.map((child: any) => {
            const className = isLeafOrHasSubFolders(child)

            const div = <div
                key={`sub-folder-${child.folderId}`}
                className={className}
                id={child.folderId}
                data-parent-id={child.parentFolderId}
                data-level={`${rootLevel}.${childLevel}`}
                style={{ marginLeft: child.level * 20 }}
            >
                <span onClick={(event) => handleClick(event)}>
                    {child.name}
                </span>
            </div>

            childLevel++

            return div
        })

        setTreeComponents(
            <div
                className="expanded"
                id={String(parentFolder.folderId)}
                data-level="0"
            >
                <span onClick={(event) => handleClick(event)}>
                    {parentFolder.name}
                </span>
                {childComponents}
            </div>
        )
    };

    const isLeafOrHasSubFolders = (child: FolderModelI) => {
        return parentChildMap.has(child.folderId) ? "collapsed" : "leaf"
    }

    const processCollapsedToExpand = (parentNode: HTMLElement) => {
        // if exists, retrieve component from cache
        // otherwise create
        const exists = doesComponentExistInCache(parentNode)
        exists ? appendCachedComponent(parentNode) : generateComponent(parentNode)

        // update to expanded
        parentNode.className = 'expanded'
    }

    const processExapandedToCollapse = (parentNode: HTMLElement) => {
        // remove div nodes and place into cache
        // caches existing child nodes under parent
        cachedComponents = Array.from(parentNode.childNodes)
            .filter((child) => child.nodeType === Node.ELEMENT_NODE &&
                (child as HTMLElement).tagName === 'DIV') as HTMLElement[];

        // removes child nodes from parent
        Array.from(parentNode.childNodes).forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName === 'DIV') {
                parentNode.removeChild(child);
            }
        });

        // update to collapse
        parentNode.className = 'collapsed'
    }

    const handleClick = (event: React.MouseEvent<HTMLSpanElement | HTMLDivElement, MouseEvent>) => {
        const parentNode = (event.target as HTMLElement).parentElement;

        if (!parentNode) throw new Error('Error retrieving parent node.')

        if (parentNode.className === 'leaf') {

            return console.warn('Leaf node - child folders do not exist')
        }
        else if (parentNode.className === 'expanded') {
            processExapandedToCollapse(parentNode)

        }
        else if (parentNode.className === 'collapsed') {
            processCollapsedToExpand(parentNode)

        }
        else throw new Error('Logic error.')
    };

    useEffect(() => {
        if (collapseMode === 'rootOnly') {

            const rootFolderId = 0
            const rootFolder = folders.filter((folder) => folder.folderId === rootFolderId)[0];
            if (!rootFolder || rootFolder.parentFolderId !== null || rootFolder.level !== 0)
                throw new Error('Root folder not found.')

            const childFolders = parentChildMap.get(rootFolderId)

            generateRootComponents(rootFolder, childFolders)
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
