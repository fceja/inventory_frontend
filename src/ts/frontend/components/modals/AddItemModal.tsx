import "@scss/components/modals/AddItemModal.scss"
import Modal from "@components/modals/Modal";
import ItemForm from "@components/forms/ItemForm"

const ItemModal = () => {
    const handleClick = () => {
        console.log('todo - handleClose')
    }
    return (
        <Modal className="item-modal" isOpen={true}>
            <div className="add-item-header">
                <div
                    onClick={handleClick}
                    className="add-item-close"
                >
                    <div className="add-item-close-bar"></div>
                    <div className="add-item-close-bar"></div>
                </div>
            </div>
            <div className="add-item-upload-image shadow">Item image container.</div>
            <ItemForm />
        </Modal>
    );
};

export default ItemModal;
