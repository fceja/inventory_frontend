import { useState } from "react"
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import "@scss/components/_modals/FolderModal.scss"
import FolderNodeModal from "@components/_modals/folder/FolderNodeModal"
import { setSelectedFolderId, setSelectedFolderName, FolderActionT } from "@store/folder/FolderActions";
import Loading from "@common/components/Loading"
import Modal from "@components/_modals/_Modal";
import { setIsFolderModalOpen, ModalActionT } from "@store/modal/ModalActions";
import useUserHasEditorRole from "@hooks/useUserHasEditorRole"

const FolderModal = () => {
    const dispatch: Dispatch<FolderActionT | ModalActionT> = useDispatch();
    const isEditor = useUserHasEditorRole()
    const [isLoading, setIsLoading] = useState(true);
    const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false)

    const handleCloseClick = () => {
        dispatch(setIsFolderModalOpen(false))
        dispatch(setSelectedFolderId(null))
        dispatch(setSelectedFolderName(null))
    }

    const handleFetchedData = () => { setIsLoading(false) }

    const handleHeaderOptionsClick = () => { setIsOptionsMenuOpen(!isOptionsMenuOpen) }

    return (
        <Modal className="folder-modal">
            <div className="folder-modal-header">
                <span className="folder-edit-options">
                    {/*<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                    <svg
                        onClick={handleHeaderOptionsClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                    {/* read only mode */}
                    {!isEditor && isOptionsMenuOpen &&
                        <span className="disabled-text">Feature disabled. <br /> READ-ONLY mode.
                            <button onClick={() => { setIsOptionsMenuOpen(false) }}>Close</button>
                        </span>
                    }
                    {/* editor mode */}
                    {isEditor && isOptionsMenuOpen &&
                        <div className="header-folder-menu-options">
                            <ul>
                                <li>
                                    <button
                                        onClick={() => { console.log('TODO - Edit') }}>Edit
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => { console.log('TODO - Move') }}>Move
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => { console.log('TODO - Delete') }}>Delete
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => { setIsOptionsMenuOpen(false) }}>Close
                                    </button>
                                </li>
                            </ul>
                        </div>
                    }
                </span>
                <span className="close-btn">
                    {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        onClick={() => handleCloseClick()}
                    >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                </span>
            </ div>
            {isLoading && <Loading className="folder-modal" />}
            <FolderNodeModal onFetchedData={handleFetchedData} />
        </Modal >
    );
};

export default FolderModal;
