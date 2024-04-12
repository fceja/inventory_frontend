import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { AuthActionT } from "@store/auth/authActions";
import { RootState } from "@store/ConfigureStore";
import ItemsApi from "@api/ItemsApi"

interface ItemDataI {
    parentFolderId: number
}

const ItemPage = () => {
    const [itemData, setItemData] = useState<ItemDataI | null>(null)
    const dispatch: Dispatch<AuthActionT> = useDispatch();
    const authState = useSelector((state: RootState) => state.authState);
    let { itemId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (itemId === null || itemId === undefined) return;

            const response = await ItemsApi(dispatch, authState).getById(itemId);
            if (response && response.status === 200 && response.data.success) setItemData(response.data.item)
        }
        fetchData();

    }, [])

    return (
        <>
            <div>This is ItemPage</div>
            {itemData &&
                <Link to={`/folders/${itemData.parentFolderId}`}>This is link. TODO.</Link>
            }
        </>
    )
}

export default ItemPage