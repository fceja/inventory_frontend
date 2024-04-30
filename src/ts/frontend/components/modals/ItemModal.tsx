import "@scss/components/modals/ItemModal.scss"
import Item from "@components/item/Item"
import Modal from "@components/modals/Modal";
import { setIsItemModalOpen } from "@store/modal/ModalActions";

const ItemModal = () => {
  return (
    <Modal
      className="item-modal"
      dispatchCallBack={() => setIsItemModalOpen(false)}
      hasHeader={true}
    >
      <Item />
    </Modal>
  );
};

export default ItemModal;
