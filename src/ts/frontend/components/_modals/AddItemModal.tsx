import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import "@scss/components/_modals/AddItemModal.scss"
import ItemForm from "@components/_forms/ItemForm"
import Modal from "@components/_modals/_Modal";
import { setIsAddItemModalOpen, ModalActionT } from "@store/modal/ModalActions";

const AddItemModal = () => {
    const dispatch: Dispatch<ModalActionT> = useDispatch();

    const handleCloseClick = () => {
        dispatch(setIsAddItemModalOpen(false))
    };

    return (
        <Modal className="add-item-modal">
            <div className="add-item-modal-header">
                <div
                    className="add-item-modal-close"
                    onClick={() => handleCloseClick()}
                >
                    <div className="add-item-modal-close-bar"></div>
                    <div className="add-item-modal-close-bar"></div>
                </div>
            </div>
            <div className="add-item-modal-upload-image shadow">Item image container.</div>
            <ItemForm />
        </Modal>
    );
};

export default AddItemModal;
