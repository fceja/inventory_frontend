import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import "@scss/components/_modals/FolderModal.scss"
import Folder from "@components/_modals/folder/FolderModalNode"
import { setSelectedFolderId, setSelectedFolderName, FolderActionT } from "@store/folder/FolderActions";
import Modal from "@components/_modals/_Modal";
import { setIsFolderModalOpen, ModalActionT } from "@store/modal/ModalActions";

const FolderModal = () => {
    const dispatch: Dispatch<FolderActionT | ModalActionT> = useDispatch();

    const handleCloseClick = () => dispatch(setIsFolderModalOpen(false))

    useEffect(() => {
        return (() => {
            dispatch(setSelectedFolderId(null))
            dispatch(setSelectedFolderName(null))
        })
    }, [])

    return (
        <Modal className="folder-modal">
            <div className="folder-modal-header" >
                <div
                    className="folder-modal-close"
                    onClick={() => handleCloseClick()}
                >
                    <div className="folder-modal-close-bar"></div>
                    <div className="folder-modal-close-bar"></div>
                </div>
            </div >
            <Folder />
        </Modal >
    );
};

export default FolderModal;
