import { useSelector } from 'react-redux';

import "@scss/components/_modals/FolderTreeModal.scss"
import { RootState } from "@store/ConfigureStore";
import Modal from "@components/_modals/_Modal"
import FolderTree from "@common/components/FolderTree"

// TODO - retrieve from api
const FOLDERS = [
    {
        "folderId": 0,
        "name": "Root Folder",
        "parentFolderId": null,
        "level": 0
    },
    {
        "folderId": 1,
        "name": "Folder 1 - Web Store",
        "parentFolderId": 0,
        "level": 1
    },
    {
        "folderId": 2,
        "name": "Folder 2 - Warehouse",
        "parentFolderId": 0,
        "level": 1
    },
    {
        "folderId": 3,
        "name": "Folder 3 - Merchandise ",
        "parentFolderId": 1,
        "level": 2
    },
    {
        "folderId": 6,
        "name": "Folder 6 - Isle A",
        "parentFolderId": 2,
        "level": 2
    },
    {
        "folderId": 4,
        "name": "Folder 4 - Shirts",
        "parentFolderId": 3,
        "level": 3
    },
    {
        "folderId": 5,
        "name": "Folder 5 - Sweatshirt",
        "parentFolderId": 3,
        "level": 3
    }
]

const FolderTreeModal = () => {
    const { folderId } = useSelector((state: RootState) => state.folderState);

    return (
        <Modal className="folder-tree-modal">
            <FolderTree folders={FOLDERS} upToFolderId={folderId} />
        </Modal>
    )
}

export default FolderTreeModal