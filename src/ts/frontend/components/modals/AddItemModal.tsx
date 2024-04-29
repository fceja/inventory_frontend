import "@scss/components/modals/AddItemModal.scss"
import ItemForm from "@components/forms/ItemForm"
import Modal from "@components/modals/Modal";
import { setIsItemModalOpen } from "@store/modal/ModalActions";

const AddItemModal = () => {
    return (
        <Modal
            className="item-modal"
            dispatchCallBack={() => setIsItemModalOpen(false)}
            hasHeader={true}
        >
            <div className="add-item-upload-image shadow">Item image container.</div>
            <ItemForm />
        </Modal>
    );
};

export default AddItemModal;
