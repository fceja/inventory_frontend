import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { PAGE_PATHS } from "@common/Constants"
import ItemsApi from "@api/ItemsApi"

interface ItemDataI {
    parentFolderId: number,
    name: string
}

const ItemPage = () => {
    const [itemName, setItemName] = useState<string>('Item not found')
    const [folderPath, setFolderPath] = useState<string>(PAGE_PATHS.FOLDERS.replace(":folderId", 'main'))
    const [itemData, setItemData] = useState<ItemDataI | null>(null)
    let { itemId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (itemId === null || itemId === undefined) return;

            const response = await ItemsApi().getItemByItemId(itemId);
            if (response && response.status === 200 && response.data.success) setItemData(response.data.item)
        }
        fetchData();

    }, [])

    useEffect(() => {
        console.log('in here itemdata')

        if (itemData) {
            setItemName(itemData.name)
            setFolderPath(PAGE_PATHS.FOLDERS.replace(":folderId", `${itemData.parentFolderId}`))

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
