import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import "@scss/components/_modals/ItemNodeModal.scss"
import { RootState } from "@store/ConfigureStore";
import ItemsApi from "@api/ItemsApi"
import NotFoundPage from "@pages/NotFoundPage";

interface ItemDataI {
    parentFolderId: number;
    name: string;
    minLevel: string;
    quantity: number;
    price: number;
}
interface ItemNodeModalI {
    onFetchedData: () => void;
}

const ItemNodeModal: React.FC<ItemNodeModalI> = (props) => {
    const { onFetchedData } = props
    const { selectedItemId } = useSelector((state: RootState) => state.itemState);
    const [itemData, setItemData] = useState<ItemDataI | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        try {

            const fetchData = async () => {
                if (!selectedItemId) return;

                const response = await ItemsApi().getItemByItemId(selectedItemId);
                if (response && response.status === 200 && response.data.success) {
                    setItemData(response.data.item)
                    onFetchedData()
                }

            }
            fetchData();
        } catch (_) {
            setIsError(true)

        } finally {
            setIsLoading(false)
        }

    }, [])

    return (
        <>
            {isLoading && <div>...loading</div>}
            {isError && <NotFoundPage />}
            {itemData &&
                <>
                    <div className="item-images-qr">
                        <span className="item-image">Image</span>
                        <span className="item-qrcode">Qr code</span>
                    </div>
                    <div className="item-description">
                        <div className="item-details">
                            <div className="item-path">Folder path: TODO</div>
                            <div className="item-name">{`Item name: ${itemData.name}`}</div>
                        </div>
                        <div className="item-quantity">
                            <span>Quantity: {`${itemData.quantity}`}</span>
                            <span>Min level: {itemData.minLevel ? itemData.minLevel : '-'}</span>
                        </div>
                        <div className="item-price">
                            <span>Price: {`$${itemData.price}`}</span>
                            <span>Total value: {`$${itemData.quantity * itemData.price}`}</span>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ItemNodeModal
