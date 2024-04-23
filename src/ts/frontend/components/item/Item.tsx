import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { AuthActionT } from "@store/auth/AuthActions";
import { RootState } from "@store/ConfigureStore";
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import ItemsApi from "@api/ItemsApi"
import NotFoundPage from "@pages/NotFoundPage";

interface ItemDataI {
    parentFolderId: number,
    name: string,
    minLevel: string
    quantity: number
    price: number
}

const Item = () => {
    const [itemData, setItemData] = useState<ItemDataI | null>(null)
    const dispatch: Dispatch<AuthActionT | ItemActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    const itemState = useSelector((state: RootState) => state.itemState);

    useEffect(() => {
        const fetchData = async () => {
            if (!itemState.selectedItemId) return;

            const response = await ItemsApi(dispatch, authState).getById(itemState.selectedItemId);
            if (response && response.status === 200 && response.data.success)
                setItemData(response.data.item)

        }
        fetchData();

    }, [])

    const handleCloseItem = () => {
        dispatch(setSelectedItemId(null))
    }

    return (
        <>
            {!itemData ? <NotFoundPage /> :
                <>
                    <div className="item-header">
                        <div
                            onClick={handleCloseItem}
                            className="item-close"
                        >
                            <div className="item-close-bar"></div>
                            <div className="item-close-bar"></div>
                        </div>
                    </div>
                    <div className="images">
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
                    <div className="btn-edit">
                        <button>Edit</button>
                    </div>
                </>
            }
        </>
    )
}

export default Item
