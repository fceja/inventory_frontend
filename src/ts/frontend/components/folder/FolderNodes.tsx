import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { AuthActionT } from "@store/auth/AuthActions";
import { RootState } from "@store/ConfigureStore";
import { PAGE_PATHS } from "@common/Constants"
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import ItemModal from "@components/modals/ItemModal"

interface SubFolderI {
    folderId: number,
    name: string,
    nodeType: string;
}

interface ItemI {
    itemId: string,
    name: string,
    nodeType: string;
}

type FolderNode = SubFolderI | ItemI;

interface PropsI {
    nodeData: FolderNode[] | null;
}

const FolderNodes: React.FC<PropsI> = React.memo((props) => {
    const dispatch: Dispatch<AuthActionT | ItemActionT> = useDispatch();
    const { selectedItemId } = useSelector((state: RootState) => state.itemState);

    const { nodeData } = props

    const handleItemClick = (itemId: string) => {
        dispatch(setSelectedItemId(itemId))
    }

    const renderNode = (node: FolderNode, index: number) => {
        if (node.nodeType === "folder") {
            const subFolderNode = node as SubFolderI

            return (
                <Link key={`node-${index}`} to={`${PAGE_PATHS.FOLDERS.replace(':folderId', `${subFolderNode.folderId}`)}`} >
                    <div key={index} className={`${subFolderNode.nodeType}-node`}>{`${subFolderNode.name} ${subFolderNode.nodeType}`}</div>
                </Link>
            )

        } else if (node.nodeType === 'item') {
            const itemNode = node as ItemI;

            return (
                <div
                    key={index}
                    className={`${itemNode.nodeType}-node`}
                    onClick={() => handleItemClick(itemNode.itemId)}>{`${itemNode.name} ${itemNode.nodeType}`}
                </div>
            )

        } else throw new Error('Invalid node type.')
    }

    return (
        <>
            <div className="folder-nodes">
                {nodeData && nodeData.length > 0 ? (
                    <>
                        {nodeData.map((node: FolderNode, index: number) => renderNode(node, index))}
                    </>
                ) : (
                    <>
                        Folder empty.
                    </>
                )}
            </div>
            {selectedItemId &&
                <ItemModal />
            }
        </>
    );
});

export default FolderNodes;
