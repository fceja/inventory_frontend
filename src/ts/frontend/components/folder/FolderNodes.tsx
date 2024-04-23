import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { AuthActionT } from "@store/auth/AuthActions";
import { RootState } from "@store/ConfigureStore";
import { PAGE_PATHS } from "@common/Constants"
import { setParentFolderId, FolderActionT } from "@store/folder/FolderActions";
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import FoldersApi from "@api/FoldersApi"
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

const FolderNodes = () => {
    const [nodeData, setNodeData] = useState<FolderNode[] | null>(null);
    const dispatch: Dispatch<AuthActionT | FolderActionT | ItemActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const folderState = useSelector((state: RootState) => state.folderState);
    const itemState = useSelector((state: RootState) => state.itemState);

    useEffect(() => {
        const fetchData = async () => {
            if (!folderState.folderId) return;

            const response = await FoldersApi(dispatch, authState).getByFolderId(folderState.folderId);
            if (response && response.status === 200 && response.data.success) {
                dispatch(setParentFolderId(response.data.folder.parentFolderId))
                setNodeData(response.data.folderNodes);
            }
        }
        fetchData();
    }, [folderState.folderId]);


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
                        {nodeData.map((node, index) => renderNode(node, index))}
                    </>
                ) : (
                    <>
                        Folder empty.
                    </>
                )}
            </div>
            {itemState.selectedItemId &&
                <ItemModal />
            }
        </>
    );
};

export default FolderNodes;
