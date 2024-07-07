import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/components/mainFolderPage/SelectionMenuAddNodes.scss"
import AddItemModal from "@components/_modals/AddItemModal"
import { RootState } from "@store/ConfigureStore";
import { FolderActionT } from "@store/folder/FolderActions";
import { setIsAddItemModalOpen, ModalActionT } from "@store/modal/ModalActions";

const SELECTION_CLASS_NAME = 'add-folder-item-selection'

const SelectionMenuAddNodes = () => {
    const dispatch: Dispatch<FolderActionT | ModalActionT> = useDispatch();
    const { isAddItemModalOpen } = useSelector((state: RootState) => state.modalState);
    const [isAddNodeBtnClicked, setIsAddNodeBtnClicked] = useState(false);
    const [isSelectionMenuVisible, setIsSelectionMenuVisible] = useState(false);

    useEffect(() => {
        const selectionDiv = document.querySelector(`.${SELECTION_CLASS_NAME}`);
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
            console.log('cancel selection')

        } else throw new Error('Invalid type.')

        setIsSelectionMenuVisible(false);
    }

    return (
        <>
            <div
                className='add-node-btn-overlay'
                onClick={() => setIsAddNodeBtnClicked(true)}
            >
                Add button
            </div>
            {isAddNodeBtnClicked &&
                <div className={SELECTION_CLASS_NAME}>
                    <button onClick={() => handleSelectionBtnClicks('folder')}>Add Folder</button>
                    <button onClick={() => handleSelectionBtnClicks('item')}>Add Item</button>
                    <button onClick={() => handleSelectionBtnClicks('cancel')}>Cancel</button>
                </div>
            }
            {isAddItemModalOpen && <AddItemModal />}
        </>
    )
}
export default SelectionMenuAddNodes