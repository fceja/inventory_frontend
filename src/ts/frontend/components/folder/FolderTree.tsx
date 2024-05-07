import React, { useEffect, useState } from "react";

import { FolderModelI } from "@common/Models"

interface PropsI {
    folders: FolderModelI[];
    upToFolderId: number
}

const FolderTree: React.FC<PropsI> = (props) => {
    const { folders, upToFolderId } = props;

    const [treeComponents, setTreeComponents] = useState<JSX.Element | null>(null)

    let cachedComponents: HTMLElement[];
    let subFolders: number[]

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

    const processExapandedToCollapse = (parentNode: HTMLElement) => {
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

    const handleClick = (event: React.MouseEvent<HTMLSpanElement | HTMLDivElement, MouseEvent>) => {
        const parentNode = (event.target as HTMLElement).parentElement;

        if (!parentNode) throw new Error('Error retrieving parent node.')

        if (parentNode.className === 'leaf') {

            return console.warn('Leaf node - child folders do not exist')
        }
        else if (parentNode.className.includes('expanded')) {
            processExapandedToCollapse(parentNode)

        }
        else if (parentNode.className.includes('collapsed')) {
            processCollapsedToExpand(parentNode)

        }
        else throw new Error('Logic error.')
    };

    function findFolderPath(folderId: number): number[] {
        const path: number[] = [];
        let currentFolderId: number | null = folderId;

        // Add the root folder ID to the path
        if (folderId === 0) return [0]

        const found = folders.find(folder => folder.folderId === folderId);
        if (!found) return [0]

        while (currentFolderId !== null) {
            path.unshift(currentFolderId);
            const currentFolder = folders.find(folder => folder.folderId === currentFolderId);
            currentFolderId = currentFolder?.parentFolderId || null;
        }
        path.unshift(0);

        return path;
    }

    function findAllSubfolders(folderId: number): number[] {
        const subfolders: number[] = [];
        const stack: number[] = [folderId];

        while (stack.length > 0) {
            const currentFolderId = stack.pop()!;
            const children = parentChildMap.get(currentFolderId) || [];

            for (const child of children) {
                subfolders.push(child.folderId);
                stack.push(child.folderId);
            }
        }

        return subfolders;
    }

    let treeComps: JSX.Element | null = null
    const generateTreeUptoId = (pathFolders: number[]) => {
        let i = pathFolders.length - 1

        if (i === 0) {
            const curFolderId = pathFolders[i]
            const curFolder = folders[curFolderId]

            treeComps = <div
                className="collapsed"
                id={String(curFolderId)}
                data-level="TODO"
                data-parent-id="null"
            >
                <span className="chev" onClick={(event) => handleClick(event)}>[ ^ ] </span>
                <span
                    className="folder-row-name"
                    onClick={(event) => handleClick(event)}>
                    {curFolder.name}
                </span>

            </div>
        }

        while (i > 0) {
            // Note: path give parent id in prev index
            const parentFolderId = pathFolders[i - 1]
            const parentFolder = folders[parentFolderId]

            const parentFolderChildren = parentChildMap.get(parentFolderId)

            let childLevel = 0

            const childComponents = parentFolderChildren?.map((child: any) => {
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
            })

            if (!treeComps) {
                treeComps = <div
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

            else {
                const secondComps = parentFolderChildren?.map((child) => {
                    if (`${child.folderId}` === treeComps?.props.id) {
                        console.log('entered here')
                        return treeComps
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

                treeComps = <div
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

            i--
        }

        setTreeComponents(treeComps)

    }

    useEffect(() => {
        const rootFolderId = 0
        const rootFolder = folders.filter((folder) => folder.folderId === rootFolderId)[0];

        if (!rootFolder || rootFolder.parentFolderId !== null || rootFolder.level !== 0)
            throw new Error('Root folder not found.')


        const path = findFolderPath(upToFolderId);
        console.log(`path`)
        console.log(path)

        subFolders = findAllSubfolders(upToFolderId);
        console.log(`subFolders`)
        console.log(subFolders)

        generateTreeUptoId(path)

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
