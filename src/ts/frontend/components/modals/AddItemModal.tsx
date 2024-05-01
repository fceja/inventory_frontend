import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import "@scss/components/modals/AddItemModal.scss"
import ItemForm from "@components/forms/ItemForm"
import Modal from "@components/modals/Modal";
import { setIsAddItemModalOpen, ModalActionT } from "@store/modal/ModalActions";

/* Note: some classNames' use scss styling from Modal.scss */
const AddItemModal = () => {
    const dispatch: Dispatch<ModalActionT> = useDispatch();

    const handleCloseClick = () => {
        dispatch(setIsAddItemModalOpen(false))
    };

    return (
        <Modal
            className="add-item-modal"
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
            <div className="add-item-upload-image shadow">Item image container.</div>
            <ItemForm />
        </Modal>
    );
};

export default AddItemModal;
