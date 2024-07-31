import { useEffect, useRef, useState } from "react"
import { Dispatch } from "redux";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

import "@scss/components/mainFolderPage/FolderContentNodes.scss"
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
    let { folderId } = useParams();

    useEffect(() => {
        /* if folderId param is not provided, folderId defaults to zero (root folder) */
        if (!folderId || folderId === ":folderId") { folderId = '0' };

        /* note - idea is to support both number and string folderId url param. */
        if (isStringANumber(folderId)) { processFolderIdNumber() }
        else { processFolderIdString() }

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

    /* handles operations if folderId url param is a number */
    const processFolderIdNumber = () => {
        if (!folderId) return;

        /**
         * if folderId url param is zero, replace displayed browser url with 'main' instead
         * if folderId url param is non-zero, keep displayed browser url as is
         */
        if (isStringAllZeroes(folderId)) {
            window.history.replaceState({}, 'Update URL to main', PAGE_PATHS.MAIN_FOLDERS.replace(':folderId', 'main'));
            folderIdRef.current = 0
        }
        else if (isStringANumber(folderId) && pathEndsWithString(folderId)) {
            folderIdRef.current = Number(folderId)
        }
    }

    /* handles operations if folderId url param is a string */
    const processFolderIdString = () => {
        if (!folderId) return;

        /* only 'main' as string url param currently supported. */
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
