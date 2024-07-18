import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/components/searchPage/ItemResults.scss"
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import { setIsItemModalOpen, ModalActionT } from "@store/modal/ModalActions";
import { ItemModelI } from "@common/Models"

interface ItemResultsI {
    results: ItemModelI[] | null
}

const ItemResults: React.FC<ItemResultsI> = (props) => {
    const { results } = props
    const dispatch: Dispatch<ItemActionT | ModalActionT> = useDispatch();
    const [itemResultsEmpty, setItemResultsEmpty] = useState(true)

    useEffect(() => {
        results && results.length > 0 ?
            setItemResultsEmpty(false) : setItemResultsEmpty(true)

    }, [results])

    const handleItemClick = (itemId: string) => {
        dispatch(setSelectedItemId(itemId))
        dispatch(setIsItemModalOpen(true))
    }

    return (
        <div className="item-results">
            Item results:
            {itemResultsEmpty ? (
                <div className="empty-search-item">[None]</div>
            ) : (
                <ul>
                    {results && results.map((elem) => (
                        <li
                            className="li-item"
                            key={`li-item-${elem.itemId}`}
                            onClick={() => handleItemClick(elem.itemId)}
                        >
                            {elem.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default ItemResults