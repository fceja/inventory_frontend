import "@scss/components/modals/ItemModal.scss"
import Modal from "@components/modals/Modal";
import Item from "@components/item/Item"

const ItemModal = () => {
  return (
    <Modal className="item-modal" isOpen={true}>
      <Item />
    </Modal>
  );
};

export default ItemModal;
