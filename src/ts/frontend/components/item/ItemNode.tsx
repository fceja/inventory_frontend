import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";


import { RootState } from "@store/ConfigureStore";
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import ItemModal from "@components/modals/ItemModal"
import { setIsItemModalOpen, ModalActionT } from "@store/modal/ModalActions";
import { ItemModelI } from "@common/Models"

interface PropsI {
    itemData: ItemModelI
}

const ItemNode: React.FC<PropsI> = (props) => {
    const { itemData } = props

    const dispatch: Dispatch<ItemActionT | ModalActionT> = useDispatch();
    const { isItemModalOpen } = useSelector((state: RootState) => state.modalState);

    const handleItemClick = (itemId: string) => {
        dispatch(setSelectedItemId(itemId))
        dispatch(setIsItemModalOpen(true))
    }

    return (
        <>
            <div
                className={`${itemData.nodeType}-node`}
                onClick={() => handleItemClick(itemData.itemId)}>{`${itemData.name} ${itemData.nodeType}`}
            </div>
            {isItemModalOpen &&
                <ItemModal />
            }
        </>
    )
}
export default ItemNode