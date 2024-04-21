import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import "@scss/pages/ItemPage.scss"
import { AuthActionT } from "@store/auth/AuthActions";
import { RootState } from "@store/ConfigureStore";
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import ItemsApi from "@api/ItemsApi"
import NotFoundPage from "@pages/NotFoundPage";

interface ItemDataI {
    parentFolderId: number,
    name: string
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
                <div className="item-header">
                    <span className="item-name">{`Item name: ${itemData.name}`}</span>
                    <div
                        onClick={handleCloseItem}
                        className="item-close"
                    >
                        <div className="item-close-bar"></div>
                        <div className="item-close-bar"></div>
                    </div>
                </div>
            }
        </>
    )
}

export default Item
