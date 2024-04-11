import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from "@store/ConfigureStore";
import FolderNodesApi from "@api/FolderNodesApi"

interface FolderNodesI {
    name: string,
    nodeType: string;
}

const Folder = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const [data, setData] = useState<FolderNodesI[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await FolderNodesApi(dispatch, authState).get(0); // zero for root
            if (response && response.status === 200 && response.data.success) {
                console.log(response.data.folderNodes);
                setData(response.data.folderNodes);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="folder">This is folder.</div>
            {data && (
                <>
                    {data.map((node, index) => (
                        <div key={index} className={`${node.nodeType}-node`}>{`${node.name} ${node.nodeType}`}</div>
                    ))}
                </>
            )}
        </>
    );
};

export default Folder;
