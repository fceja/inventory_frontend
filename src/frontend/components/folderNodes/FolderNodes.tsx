import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import { Dispatch } from "redux";

import { AuthActionT } from "@store/auth/authActions";
import { RootState } from "@store/ConfigureStore";
import FolderNodesApi from "@api/FolderNodesApi"

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
    const dispatch: Dispatch<AuthActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    let { folderId } = useParams();

    // verify final string is a number
    if (!folderId) throw new Error('TODO - redirect error comp')
    if (folderId === 'main') folderId = '0'
    if (!(!isNaN(parseFloat(folderId)) && isFinite(+folderId))) throw new Error('TODO - redirect error comp')

    useEffect(() => {
        const fetchData = async () => {
            if (folderId !== null) {
                const response = await FolderNodesApi(dispatch, authState).get(folderId);
                if (response && response.status === 200 && response.data.success) {
                    console.log(response.data.folderNodes);
                    setNodeData(response.data.folderNodes);
                }
            };
        }
        fetchData();
    }, [folderId]);

    const renderNode = (node: FolderNode, index: number) => {
        if (node.nodeType === "folder") {
            const subFolderNode = node as SubFolderI

            return (
                <Link key={`node-${index}`} to={`/folder/${subFolderNode.folderId}`} >
                    <div key={index} className={`${subFolderNode.nodeType}-node`}>{`${subFolderNode.name} ${subFolderNode.nodeType}`}</div>
                </Link>
            )

        } else if (node.nodeType === 'item') {
            const itemNode = node as ItemI;

            return (
                <Link key={`node-${index}`} to={`/item/${itemNode.itemId}`} >
                    <div key={index} className={`${itemNode.nodeType}-node`}>{`${itemNode.name} ${itemNode.nodeType}`}</div>
                </Link>
            )

        } else throw new Error('Invalid node type.')
    }

    return (
        <>
            {nodeData && (
                <>
                    {nodeData.map((node, index) => renderNode(node, index))}
                </>
            )}
        </>
    );
};

export default FolderNodes;
