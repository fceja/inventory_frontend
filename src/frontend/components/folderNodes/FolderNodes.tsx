
import { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (folderState.folderLevel === null) dispatch(setFolderLevel(0))  // zero for root folder
    }, [])

    useEffect(() => {
        if (folderState.folderLevel !== null) {
            const fetchData = async () => {
                const response = await FolderNodesApi(dispatch, authState).get(Number(folderState.folderLevel));
                if (response && response.status === 200 && response.data.success) {
                    console.log(response.data.folderNodes);
                    setData(response.data.folderNodes);
                }
            };
            fetchData();
        }
    }, [folderState.folderLevel]);

    return (
        <>
            {data && (
                <>
                    {data.map((node, index) => (
                        <div key={index} className={`${node.nodeType}-node ${node.nodeType}`}>{`${node.name} ${node.nodeType}`}</div>
                    ))}
                </>
            )}
        </>
    );
};

export default FolderNodes;
