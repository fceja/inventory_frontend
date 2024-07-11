import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import "@scss/components/_modals/ItemNodeModal.scss"
import { RootState } from "@store/ConfigureStore";
import ItemsApi from "@api/ItemsApi"
import NotFoundPage from "@pages/NotFoundPage";

interface ItemDataI {
    parentFolderId: number,
    name: string,
    minLevel: string
    quantity: number
    price: number
}

const ItemNodeModal = () => {
    const { selectedItemId } = useSelector((state: RootState) => state.itemState);
    const [itemData, setItemData] = useState<ItemDataI | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedItemId) return;

            const response = await ItemsApi().getItemByItemId(selectedItemId);
            if (response && response.status === 200 && response.data.success)
                setItemData(response.data.item)

        }
        fetchData();

    }, [])

    return (
        <>
            {!itemData ? <NotFoundPage /> :
                <>
                    <div className="item-images-qr">
                        <span className="item-image">Image</span>
                        <span className="item-qrcode">Qr code</span>
                    </div>
                    <div className="item-description">
                        <div className="item-details">
                            <div>Folder path: TODO</div>
                            <div >{`Item name: ${itemData.name}`}</div>
                        </div>
                        <div className="item-quantity">
                            <span>Quantity: {`${itemData.quantity}`}</span>
                            <span>Min Level: {itemData.minLevel ? itemData.minLevel : '-'}</span>
                        </div>
                        <div className="item-price">
                            <span>Price: {`$${itemData.price}`}</span>
                            <span>Total Value: {`$${itemData.quantity * itemData.price}`}</span>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ItemNodeModal
