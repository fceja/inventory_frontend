import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import Item from "@components/item/Item"
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import "@scss/components/modals/ItemModal.scss"
import Modal from "@components/modals/Modal";
import { setIsItemModalOpen } from "@store/modal/ModalActions";

const ItemModal = () => {
  const dispatch: Dispatch<ItemActionT> = useDispatch();

  useEffect(() => {
    return (() => {
      dispatch(setSelectedItemId(null))
    })

  }, [])

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
