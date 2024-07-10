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
    const [nodeData, setNodeData] = useState<NodeDataI | null>(null);
    const folderIdRef = useRef<number | null>(null);
    const { folderId } = useParams();

    /**
     * parses folderId param from url
     * if folderId param is 'main':
     *  - we use zero as folderId. (root folder)
     * if folderId param is a number:
     *  - if folderId is zero, we push 'main' to url path.
     *  - if folderId param not zero, we keep url path as is.
     *
     * Note - the idea is for folderId url param to support both strings and numbers
     *  - if number, we are using the true folderId of folder to return contents
     *  - if string, we are using he folder name to return folder contents (future support)
     */
    useEffect(() => {
        if (!folderId) return;

        if (isStringANumber(folderId)) processFolderIdNumber()
        else processFolderIdString()

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

    /* handles operations if folderId param is a number */
    const processFolderIdNumber = () => {
        if (!folderId) return;

        if (isStringAllZeroes(folderId)) {
            window.history.pushState({}, 'Update URL to main', PAGE_PATHS.FOLDERS.replace(':folderId', 'main'));
            folderIdRef.current = 0
        }
        else if (isStringANumber(folderId) && pathEndsWithString(folderId)) {
            folderIdRef.current = Number(folderId)
        }
    }

    /* handles operations if folderId param is a string */
    const processFolderIdString = () => {
        if (!folderId) return;

        if (folderId === 'main') {
            folderIdRef.current = 0

        } else throw new Error('Invalid folderId url param.')
    }

    return (
        <>
            {nodeData && nodeData.folderNodes && nodeData.folderNodes.length > 0 ? (
                <div className="folder-nodes">
                    {nodeData.folderNodes.map((node: FolderNode, index: number) => {
                        if (node.nodeType === "folder") {
                            const subFolderNode = node as SubFolderModelI

                            return <SubFolderNode key={`subfolder-${index}`} subFolderData={subFolderNode} />

                        } else if (node.nodeType === "item") {
                            const itemNode = node as ItemModelI

                            return <ItemNode key={`item-${index}`} itemData={itemNode} />

                        } else throw new Error('Invalid node type.')
                    })}
                </div>
            ) : (
                <div className="folder-empty">[Folder empty]</div>
            )}
        </>
    );
}

export default FolderContentNodes;
