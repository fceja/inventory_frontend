import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import "@scss/pages/ItemPage.scss"
import { AuthActionT } from "@store/auth/authActions";
import { RootState } from "@store/ConfigureStore";
import ItemsApi from "@api/ItemsApi"

interface ItemDataI {
    parentFolderId: number,
    name: string
}

const ItemPage = () => {
    const [itemName, setItemName] = useState<string>('Item not found')
    const [folderPath, setFolderPath] = useState<string>('/folder/main')
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

    useEffect(() => {
        console.log('in here itemdata')

        if (itemData) {
            setItemName(itemData.name)
            setFolderPath(`/folder/${itemData.parentFolderId}`)

        }

    }, [itemData])

    return (
        <div className="item-header">
            <>
                <div>{`Item name: ${itemName}`}</div>
                <Link to={`${folderPath}`}>
                    <div
                        className="item-ham-menu-bar-container"
                    >
                        <div className="item-ham-bar clicked"></div>
                        <div className="item-ham-bar clicked"></div>
                        <div className="item-ham-bar clicked"></div>
                    </div>
                </Link>
            </>
        </div>
    )
}

export default ItemPage
