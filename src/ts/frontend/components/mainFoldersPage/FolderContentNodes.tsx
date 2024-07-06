import { useEffect, useRef, useState } from "react"
import { Dispatch } from "redux";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

import { PAGE_PATHS } from "@common/Constants"
import { setFolderData, FolderActionT } from "@store/folder/FolderActions";
import FoldersApi from "@api/FoldersApi"
import ItemNode from "@components/mainFoldersPage/ItemNode"
import { FolderModelI, ItemModelI, SubFolderModelI } from "@common/Models"
import { isStringAllZeroes, isStringANumber, pathEndsWithString } from "@utils/string/StringUtils"
import SubFolderNode from "@components/mainFoldersPage/SubFolderNode"

type FolderNode = SubFolderModelI | ItemModelI;

interface NodeDataI {
    folder: FolderModelI | null,
    folderNodes: FolderNode[] | null
}

const FolderContentNodes = () => {
    const dispatch: Dispatch<FolderActionT> = useDispatch();
    const navigate = useNavigate();
    const { folderId } = useParams();

    const [nodeData, setNodeData] = useState<NodeDataI | null>(null);
    const folderIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!folderId) return;

        // determines if folderId param is a number or string
        if (isStringANumber(folderId)) processNumber()
        else processString()

        fetchData()

    }, [folderId])

    const fetchData = async () => {
        if (folderIdRef.current === null || !(folderIdRef.current >= 0)) return;

        try {
            const response = await FoldersApi().getByFolderId(folderIdRef.current);
            if (response && response.status === 200 && response.data.success) {
                setNodeData(response.data)
                dispatch(setFolderData({
                    folderId: folderIdRef.current,
                    folderName: response.data.folder.name,
                    parentFolderId: response.data.folder.parentFolderId
                }))

            }
            else {
                navigate("/not-found");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const processNumber = () => {
        // handles operations if folderId param is a number
        if (!folderId) return;

        if (isStringAllZeroes(folderId)) {
            window.history.pushState({}, 'Update URL to main', PAGE_PATHS.FOLDERS.replace(':folderId', 'main'));
            folderIdRef.current = 0
        }
        else if (isStringANumber(folderId) && pathEndsWithString(folderId)) {
            folderIdRef.current = Number(folderId)
        }
    }

    const processString = () => {
        // handles operations if folderId param is a string
        if (!folderId) return;

        if (folderId === 'main') folderIdRef.current = 0
    }

    return (
        <div className="folder-nodes">
            {nodeData && nodeData.folderNodes && nodeData.folderNodes.length > 0 ? (
                <>
                    {nodeData.folderNodes.map((node: FolderNode, index: number) => {
                        if (node.nodeType === "folder") {
                            const subFolderNode = node as SubFolderModelI

                            return <SubFolderNode key={`subfolder-${index}`} subFolderData={subFolderNode} />

                        } else if (node.nodeType === "item") {
                            const itemNode = node as ItemModelI

                            return <ItemNode key={`item-${index}`} itemData={itemNode} />

                        } else throw new Error('Invalid node type.')
                    })}
                </>
            ) : (
                <div className="folder-empty">[Folder empty]</div>
            )}
        </div>
    );
}

export default FolderContentNodes;
