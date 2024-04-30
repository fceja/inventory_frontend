import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import "@scss/components/modals/ItemModal.scss"
import Item from "@components/item/Item"
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
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
      modalType="item"
    >
      <Item />
    </Modal>
  );


};

export default ItemModal;
