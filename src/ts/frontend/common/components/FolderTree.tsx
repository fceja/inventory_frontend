import React, { useEffect, useState } from "react";

import "@scss/components/mainFolderPage/FolderTree.scss"
import { FolderModelI } from "@common/Models"

interface PropsI {
    folders: FolderModelI[];
    upToFolderId: number
}

const DEFAULT_ROOT_FOLDER_ID = 0

const FolderTree: React.FC<PropsI> = (props) => {
    let cachedComponents: HTMLElement[];
    let currentFolderTree: JSX.Element | null = null
    const [finalFolderTree, setFinalFolderTree] = useState<JSX.Element | null>(null)
    const parentChildMap: Map<number, FolderModelI[]> = new Map<number, FolderModelI[]>();

    const { folders, upToFolderId } = props;

    useEffect(() => {
        /* retrieve root folder */
        const rootFolder = folders.filter((folder) => folder.folderId === DEFAULT_ROOT_FOLDER_ID)[0];
        if (!rootFolder || rootFolder.parentFolderId !== null || rootFolder.level !== 0)
            throw new Error('Root folder not found.')

        /* create map of parentFolderIds and its child folders */
        generateParentChildMap()

        /* get path of folderIds from root folder to target folderId*/
        const pathFolderIdsFromRootToTarget = findPathOfFolderIdsFromRootToTargetFolder(upToFolderId);

        /* create and set folder tree component */
        generateFolderTree(pathFolderIdsFromRootToTarget)
        setFinalFolderTree(currentFolderTree)

    }, [])

    const generateParentChildMap = () => {
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
    }

    const addChildrenToRootComponentsTree = (parentFolder: FolderModelI, parentFolderId: number, childLevel: number, parentFolderChildren: FolderModelI[] | undefined) => {
        const secondComps = parentFolderChildren?.map((child) => {
            if (`${child.folderId}` === currentFolderTree?.props.id) {
                return currentFolderTree
            } else {
                const className = isLeafOrHasSubFolders(child)

                let chev
                if (className === "leaf") {
                    chev = "-"
                } else {
                    chev = className === "collapsed" ? "^" : "v"

                }

                const div = <div
                    key={`sub-folder-${child.folderId}`}
                    className={className}
                    id={`${child.folderId}`}
                    data-parent-id={child.parentFolderId}
                    data-level={`${parentFolder.level}.${childLevel}`}
                    style={{ marginLeft: child.level * 20 }}
                >
                    <span className="chev" onClick={(event) => handleClick(event)}>[ {chev} ] </span>
                    <span
                        className="folder-row-name"
                        onClick={(event) => handleClick(event)}>
                        {child.name}
                    </span>
                </div >

                return div
            }
        })

        currentFolderTree = <div
            key={`built-tree-${parentFolderId}`}
            className="expanded"
            id={String(parentFolderId)}
            data-level="TODO"
            data-parent-id={`todo 2`}
        >
            <span className="chev" onClick={(event) => handleClick(event)}>[ v ] </span>
            <span
                className="folder-row-name"
                onClick={(event) => handleClick(event)}>
                {parentFolder.name}
            </span>
            {secondComps?.map((component, index) => ( // Use map to iterate over secondComps
                <React.Fragment key={`second-comp-${index}`}> {/* Use fragment to avoid extra wrapper */}
                    {component}
                </React.Fragment>
            ))}
        </div>
    }

    const addRootToComponentTree = (parentFolder: FolderModelI, parentFolderId: number, childComponents: JSX.Element[] | undefined) => {
        currentFolderTree = <div
            className="expanded"
            id={String(parentFolderId)}
            data-level="TODO"
            style={{ marginLeft: parentFolder.level * 20 }}
            data-parent-id={`${parentFolder.parentFolderId}`}
        >
            <span className="chev" onClick={(event) => handleClick(event)}>[ v ] </span>
            <span
                className="folder-row-name"
                onClick={(event) => handleClick(event)}>
                {parentFolder.name}
            </span>
            {childComponents}
        </div>
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

            let chev
            if (className === "leaf") {
                chev = "-"
            } else {
                chev = className === "collapsed" ? "^" : "v"
            }

            const div = document.createElement('div');
            div.className = className;
            div.id = String(child.folderId);
            div.setAttribute('data-parent-id', `${child.parentFolderId}`);
            div.setAttribute('data-level', `${parentDiv?.getAttribute('data-level')}.${childLevel}`);
            div.style.marginLeft = `${20}px`;


            let span = null;
            span = document.createElement('span');
            span.className = "chev"
            span.onclick = (event) => handleClick(event as unknown as React.MouseEvent<HTMLDivElement | HTMLSpanElement, MouseEvent>);
            span.textContent = `[ ${chev} ] `
            div.appendChild(span);

            span = document.createElement('span');
            span.className = "folder-row-name"
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

    const findPathOfFolderIdsFromRootToTargetFolder = (folderId: number) => {
        const path: number[] = [];

        if (folderId === 0) return [0]

        const found = folders.find(folder => folder.folderId === folderId);
        if (!found) return [0]

        let currentFolderId: number | null = folderId;
        while (currentFolderId !== null) {
            path.unshift(currentFolderId);

            const currentFolder = folders.find(folder => folder.folderId === currentFolderId);
            if (currentFolder) {
                currentFolderId = currentFolder.parentFolderId
            }
        }

        return path;
    }

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

    const generateFolderTree = (pathFromRootToTargetFolderId: number[]) => {
        let i = pathFromRootToTargetFolderId.length

        while (i > 0) {
            // Note: path give parent id in prev index
            const parentFolderId = pathFromRootToTargetFolderId[i - 1]
            const parentFolder = folders[parentFolderId]
            const parentFolderChildren = parentChildMap.get(parentFolderId)
            let childLevel = 0

            const childComponents = getChildComponents(parentFolder, childLevel, parentFolderChildren)

            if (!currentFolderTree) { addRootToComponentTree(parentFolder, parentFolderId, childComponents) }
            else { addChildrenToRootComponentsTree(parentFolder, parentFolderId, childLevel, parentFolderChildren) }

            i--
        }
    }

    const getChildComponents = (parentFolder: FolderModelI, childLevel: number, parentFolderChildren: FolderModelI[] | undefined) => {
        return (
            parentFolderChildren?.map((child: any) => {
                const className = isLeafOrHasSubFolders(child)

                let chev
                if (className === "leaf") {
                    chev = "-"
                } else {
                    chev = className === "collapsed" ? "^" : "v"

                }

                const div = <div
                    key={`sub-folder-${child.folderId}`}
                    className={className}
                    id={child.folderId}
                    data-parent-id={child.parentFolderId}
                    data-level={`${parentFolder.level}.${childLevel}`}
                    style={{ marginLeft: child.level * 20 }}
                >
                    <span className="chev" onClick={(event) => handleClick(event)}>[ {chev} ] </span>
                    <span
                        className="folder-row-name"
                        onClick={(event) => handleClick(event)}>
                        {child.name}
                    </span>
                </div >

                childLevel++

                return div
            }))

    }

    const handleClick = (event: React.MouseEvent<HTMLSpanElement | HTMLDivElement, MouseEvent>) => {
        const parentNode = (event.target as HTMLElement).parentElement;

        if (!parentNode) throw new Error('Error retrieving parent node.')

        if (parentNode.className === 'leaf') {

            return console.warn('Leaf node - child folders do not exist')
        }
        else if (parentNode.className.includes('expanded')) {
            processExpandedToCollapse(parentNode)

        }
        else if (parentNode.className.includes('collapsed')) {
            processCollapsedToExpand(parentNode)

        }
        else throw new Error('Logic error.')
    };

    const isLeafOrHasSubFolders = (child: FolderModelI) => {
        return parentChildMap.has(child.folderId) ? "collapsed" : "leaf"
    }

    const processCollapsedToExpand = (parentNode: HTMLElement) => {
        // if exists, retrieve component from cache
        // otherwise create
        let chevSpan: HTMLElement | null = null;
        for (const node of parentNode.childNodes) {
            if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).classList.contains('chev')) {
                chevSpan = node as HTMLElement;
                break;
            }
        }
        if (chevSpan) chevSpan.textContent = "[ v ] "


        const exists = doesComponentExistInCache(parentNode)

        exists ? appendCachedComponent(parentNode) : generateComponent(parentNode)

        // update to expanded
        parentNode.className = 'expanded'
    }

    const processExpandedToCollapse = (parentNode: HTMLElement) => {
        // remove div nodes and place into cache
        // caches existing child nodes under parent
        let chevSpan: HTMLElement | null = null;
        for (const node of parentNode.childNodes) {
            if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).classList.contains('chev')) {
                chevSpan = node as HTMLElement;
                break;
            }
        }
        if (chevSpan) chevSpan.textContent = "[ ^ ] "

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

    return (
        <>
            {finalFolderTree &&
                <div className="folder-tree">
                    finalFolderTree
                </div >
            }
        </>
    )

};

export default FolderTree;
