import React from "react"

import ItemNode from "@components/item/ItemNode"
import { FolderModelI, ItemModelI, SubFolderModelI } from "@common/Models"
import SubFolderNode from "@components/subFolder/SubFolderNode"

type FolderNode = SubFolderModelI | ItemModelI;

interface PropsI {
    nodeData: {
        folder: FolderModelI | null,
        folderNodes: FolderNode[] | null
    };
}

const FolderNodes: React.FC<PropsI> = React.memo((props) => {
    const { nodeData } = props

    return (
        <>
            <div className="folder-nodes">
                {nodeData && nodeData.folderNodes && nodeData.folderNodes.length > 0 ? (
                    <>
                        {
                            nodeData.folderNodes.map((node: FolderNode, index: number) => {
                                if (node.nodeType === "folder") {
                                    const subFolderNode = node as SubFolderModelI

                                    return <SubFolderNode key={`subfolder-${index}`} subFolderData={subFolderNode} />
                                } else if (node.nodeType === "item") {
                                    const itemNode = node as ItemModelI

                                    return <ItemNode key={`item-${index}`} itemData={itemNode} />
                                } else throw new Error('Invalid node type.')
                            })
                        }
                    </>
                ) : (
                    <div className="folder-empty">
                        [Folder empty]
                    </div>
                )}
            </div>
        </>
    );
})

export default FolderNodes;
