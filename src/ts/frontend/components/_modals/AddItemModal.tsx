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
                <svg
                    className="add-item-modal-close"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    onClick={() => handleCloseClick()}
                >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
            </div>
            <div className="add-item-modal-upload-image">TODO: Add image upload.</div>
            <ItemForm />
        </Modal>
    );
};

export default AddItemModal;
