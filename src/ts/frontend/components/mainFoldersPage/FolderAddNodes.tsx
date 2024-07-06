import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import { RootState } from "@store/ConfigureStore";
import AddItemModal from "@components/_modals/AddItemModal"

import { FolderActionT } from "@store/folder/FolderActions";
import { setIsAddItemModalOpen, ModalActionT } from "@store/modal/ModalActions";

const FolderAddNodes = () => {
    const dispatch: Dispatch<FolderActionT | ModalActionT> = useDispatch();
    const { isAddItemModalOpen } = useSelector((state: RootState) => state.modalState);

    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [makeActive, setMakeActive] = useState(false);

    const handleAddBtnClick = () => {
        setIsAddBtnClicked(true);
    };

    const handleBtnClose = () => {
        setMakeActive(false);
    }

    const handleBtnClicks = (type: string) => {
        if (type === "folder") {
            console.log('TODO - adding folder')
        }
        else if (type === "item") {
            console.log('TODO - adding item')
            dispatch(setIsAddItemModalOpen(true))

        } else if (type === "cancel") {
        } else throw new Error('Invalid type.')

        handleBtnClose()
    }

    useEffect(() => {
        const btnsDiv = document.querySelector('.btns-container');
        if (!btnsDiv) return;

        if (makeActive) {
            btnsDiv.classList.add('active');
        }

        else {
            btnsDiv.classList.remove('active');
            setTimeout(() => {
                setIsAddBtnClicked(false);
            }, 500)
        }
    }, [makeActive])

    useEffect(() => {
        if (isAddBtnClicked) {
            setMakeActive(true)
        }
    }, [isAddBtnClicked])

    return (
        <>
            {isAddBtnClicked &&
                <div className="btns-container">
                    <button onClick={() => handleBtnClicks('folder')}>Add Folder</button>
                    <button onClick={() => handleBtnClicks('item')}>Add Item</button>
                    <button onClick={() => handleBtnClicks('cancel')}>Cancel</button>
                </div>
            }
            {isAddItemModalOpen && <AddItemModal />}
            <div
                className='btn-add'
                onClick={handleAddBtnClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            >
                Add button
            </div>
        </>
    )
}
export default FolderAddNodes