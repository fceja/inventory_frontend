import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import Folder from "@components/folder/Folder"
import { setSelectedFolderId, setSelectedFolderName, FolderActionT } from "@store/folder/FolderActions";
import "@scss/components/modals/FolderModal.scss"
import Modal from "@components/modals/Modal";
import { setIsFolderModalOpen } from "@store/modal/ModalActions";

const FolderModal = () => {
    const dispatch: Dispatch<FolderActionT> = useDispatch();

    useEffect(() => {
        return (() => {
            dispatch(setSelectedFolderId(null))
            dispatch(setSelectedFolderName(null))
        })
    }, [])

    return (
        <Modal
            className="folder-modal"
            dispatchCallBack={() => setIsFolderModalOpen(false)}
            hasHeader={true}
        >
            <Folder />
        </Modal>
    );
};

export default FolderModal;
