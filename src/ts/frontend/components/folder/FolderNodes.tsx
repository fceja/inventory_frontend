import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { AuthActionT } from "@store/auth/authActions";
import { RootState } from "@store/ConfigureStore";
import { PAGE_PATHS } from "@common/Constants"
import { FolderActionT } from "@store/folder/folderActions";
import { setParentFolderId } from "@store/folder/folderActions";
import FoldersApi from "@api/FoldersApi"

interface SubFolderI {
    folderId: number,
    name: string,
    nodeType: string;
}

interface ItemI {
    itemId: number,
    name: string,
    nodeType: string;
}

type FolderNode = SubFolderI | ItemI;

const FolderNodes = () => {
    const [nodeData, setNodeData] = useState<FolderNode[] | null>(null);
    const dispatch: Dispatch<AuthActionT | FolderActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const folderState = useSelector((state: RootState) => state.folderState);

    useEffect(() => {
        const fetchData = async () => {
            if (!folderState.curLevelFolderId) return;

            const response = await FoldersApi(dispatch, authState).getByFolderId(folderState.curLevelFolderId);
            if (response && response.status === 200 && response.data.success) {
                dispatch(setParentFolderId(response.data.folder.parentFolderId))
                setNodeData(response.data.folderNodes);
            }
        }
        fetchData();
    }, [folderState.curLevelFolderId]);

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
                <Link key={`node-${index}`} to={`${PAGE_PATHS.ITEMS.replace(':itemId', `${itemNode.itemId}`)}`} >
                    <div key={index} className={`${itemNode.nodeType}-node`}>{`${itemNode.name} ${itemNode.nodeType}`}</div>
                </Link>
            )

        } else throw new Error('Invalid node type.')
    }

    return (
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
    );
};

export default FolderNodes;
