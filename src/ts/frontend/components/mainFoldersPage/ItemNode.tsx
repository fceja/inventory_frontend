import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/components/mainFolderPage/ItemNode.scss"
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import { setIsItemModalOpen, ModalActionT } from "@store/modal/ModalActions";
import { ItemModelI } from "@common/Models"

interface PropsI {
    itemData: ItemModelI
}

const ItemNode: React.FC<PropsI> = (props) => {
    const { itemData } = props

    const dispatch: Dispatch<ItemActionT | ModalActionT> = useDispatch();

    const handleItemClick = (itemId: string) => {
        dispatch(setSelectedItemId(itemId))
        dispatch(setIsItemModalOpen(true))
    }

    return (
        <>
            <div
                className={"item-node"}
                onClick={() => handleItemClick(itemData.itemId)}>
                {`${itemData.name} ${itemData.nodeType}`}
            </div>
        </>
    )
}
export default ItemNode