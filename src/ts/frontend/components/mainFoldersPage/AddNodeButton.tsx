import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/components/mainFolderPage/AddNodeButton.scss"
import AddItemModal from "@components/_modals/AddItemModal"
import { RootState } from "@store/ConfigureStore";
import { FolderActionT } from "@store/folder/FolderActions";
import { setIsAddItemModalOpen, ModalActionT } from "@store/modal/ModalActions";

const SELECTION_DIV_CLASS_NAME = 'add-folder-item-selection'

const AddNodeButton = () => {
    const dispatch: Dispatch<FolderActionT | ModalActionT> = useDispatch();
    const { isAddItemModalOpen } = useSelector((state: RootState) => state.modalState);
    const { userRole } = useSelector((state: RootState) => state.userState);
    const isEditorRef = useRef(false)
    const [isAddNodeBtnClicked, setIsAddNodeBtnClicked] = useState(false);
    const [isSelectionMenuVisible, setIsSelectionMenuVisible] = useState(false);

    useEffect(() => {
        const selectionDiv = document.querySelector(`.${SELECTION_DIV_CLASS_NAME}`);
        if (!selectionDiv) return;

        if (isSelectionMenuVisible) {
            selectionDiv.classList.add('animate');
            return;
        }

        selectionDiv.classList.remove('animate');

        setTimeout(() => {
            setIsAddNodeBtnClicked(false);
        }, 500)

    }, [isSelectionMenuVisible])

    useEffect(() => {
        if (isAddNodeBtnClicked) setIsSelectionMenuVisible(true);

    }, [isAddNodeBtnClicked])

    const handleSelectionBtnClicks = (btnType: string) => {
        if (btnType === "folder") {
            console.log('TODO - adding folder')
        }
        else if (btnType === "item") {
            console.log('TODO - adding item')
            dispatch(setIsAddItemModalOpen(true))

        } else if (btnType === "cancel") {
            console.log('cancel')

        } else if (btnType === "exit") {
            console.log('exit')

        } else throw new Error('Invalid type.')

        setIsSelectionMenuVisible(false);
    }

    /* determines if user can edit or readonly */
    if (!userRole) {
        isEditorRef.current = false
    }
    else if (["editor", "publisher", "admin"].includes(userRole)) {
        isEditorRef.current = true
    }
    else { isEditorRef.current = false }

    return (
        <>
            <div
                className='add-node-btn-overlay'
                onClick={() => setIsAddNodeBtnClicked(true)}
            >
                { /*<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
            </div>
            {/* read only mode */}
            {!isEditorRef.current && isAddNodeBtnClicked &&
                <div className={SELECTION_DIV_CLASS_NAME}>
                    <span className="disabled-text">Feature disabled. <br /> READ-ONLY mode.</span>
                    <button onClick={() => handleSelectionBtnClicks('exit')}>Exit</button>
                </div>
            }
            {/* editor mode */}
            {isEditorRef.current && isAddNodeBtnClicked &&
                <div className={SELECTION_DIV_CLASS_NAME}>
                    <button onClick={() => handleSelectionBtnClicks('folder')}>Add Folder</button>
                    <button onClick={() => handleSelectionBtnClicks('item')}>Add Item</button>
                    <button onClick={() => handleSelectionBtnClicks('cancel')}>Cancel</button>
                </div>
            }
            {isAddItemModalOpen && <AddItemModal />}
        </>
    )
}
export default AddNodeButton
