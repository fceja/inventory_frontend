import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import Folder from "@components/_modals/folder/FolderModalNode"
import { setSelectedFolderId, setSelectedFolderName, FolderActionT } from "@store/folder/FolderActions";
import "@scss/components/_modals/FolderModal.scss"
import Modal from "@components/_modals/_Modal";
import { setIsFolderModalOpen, ModalActionT } from "@store/modal/ModalActions";

/* Note: some classNames' use scss styling from Modal.scss */
const FolderModal = () => {
    const dispatch: Dispatch<FolderActionT | ModalActionT> = useDispatch();

    const handleCloseClick = () => {
        dispatch(setIsFolderModalOpen(false))

    }

    useEffect(() => {
        return (() => {
            dispatch(setSelectedFolderId(null))
            dispatch(setSelectedFolderName(null))
        })
    }, [])

    return (
        <Modal
            className="folder-modal"
        >
            <div className="modal-header">
                <div
                    className="modal-close"
                    onClick={() => handleCloseClick()}
                >
                    <div className="modal-close-bar"></div>
                    <div className="modal-close-bar"></div>
                </div>
            </div>
            <Folder />
        </Modal>
    );
};

export default FolderModal;
