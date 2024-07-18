import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";

import { setSelectedFolderId, setSelectedFolderName, FolderActionT } from "@store/folder/FolderActions";
import { setIsFolderModalOpen, ModalActionT } from "@store/modal/ModalActions";
import { FolderModelI } from "@common/Models"

interface FolderResultsI {
    results: FolderModelI[] | null,
}

const FolderResults: React.FC<FolderResultsI> = (props) => {
    const { results } = props
    const dispatch: Dispatch<FolderActionT | ModalActionT> = useDispatch();
    const [folderResultsEmpty, setFolderResultsEmpty] = useState(true)

    useEffect(() => {
        results && results.length > 0 ?
            setFolderResultsEmpty(false) : setFolderResultsEmpty(true)
    }, [])

    const handleFolderClick = (folderId: number, name: string) => {
        dispatch(setSelectedFolderId(folderId))
        dispatch(setSelectedFolderName(name))
        dispatch(setIsFolderModalOpen(true))
    }

    return (
        <div className="folder-results">
            <div>Folder results:</div>
            {folderResultsEmpty ? (
                <div className="empty-search">[None]</div>
            ) : (
                <ul>
                    {results && results.map((elem) => (
                        <li
                            className="li-folder"
                            key={`li-folder-${elem.folderId}`}
                            onClick={() => handleFolderClick(elem.folderId, elem.name)}
                        >
                            {elem.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default FolderResults