
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import { RootState } from "@store/ConfigureStore";
import FolderNodesApi from "@api/FolderNodesApi"
import { setFolderLevel, FolderActionT } from "@store/folder/folderActions";
import { AuthActionT } from "@store/auth/authActions";

interface FolderNodesI {
    name: string,
    nodeType: string;
}

const FolderNodes = () => {
    const [data, setData] = useState<FolderNodesI[] | null>(null);
    const dispatch: Dispatch<AuthActionT | FolderActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const folderState = useSelector((state: RootState) => state.folderState);
    let { folderId } = useParams();

    // if folderId path provided is 'main', convert to root folderId (zero)
    if (!folderId) throw new Error('TODO - redirect error comp')
    if (folderId === 'main') folderId = '0'

    // verify final string is a number
    if (!(!isNaN(parseFloat(folderId)) && isFinite(+folderId))) throw new Error('TODO - redirect error comp')

    useEffect(() => {
        if (folderState.folderLevel === null || folderState.folderLevel === undefined) {
            dispatch(setFolderLevel(folderId)); // zero for root folder
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (folderState.folderLevel !== null) {
                const response = await FolderNodesApi(dispatch, authState).get(folderState.folderLevel);
                if (response && response.status === 200 && response.data.success) {
                    console.log(response.data.folderNodes);
                    setData(response.data.folderNodes);
                }
            };
        }
        fetchData();
    }, [folderState.folderLevel]);

    const handleNodeClick = (event: any) => {
        if (event.target.className === "folder-node") {
            console.log('received folder-node')
        } else if (event.target.className === "item-node") {
            console.log('received item-node')
        } else {
            throw new Error('Invalid node class type.')
        }
    }

    return (
        <>
            {data && (
                <>
                    {data.map((node, index) => (
                        <div key={index} className={`${node.nodeType}-node`} onClick={handleNodeClick}>{`${node.name} ${node.nodeType}`}</div>
                    ))}
                </>
            )}
        </>
    );
};

export default FolderNodes;
