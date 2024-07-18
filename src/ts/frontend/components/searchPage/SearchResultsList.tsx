import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/components/searchPage/SearchResultsList.scss"
import { RootState } from "@store/ConfigureStore";
import { FolderActionT } from "@store/folder/FolderActions";
import FolderModal from "@components/_modals/folder/FolderModal"
import FolderResults from "@components/searchPage/FolderResults"
import { setSelectedItemId, ItemActionT } from "@store/item/ItemActions";
import ItemModal from "@components/_modals/item/ItemModal"
import { setIsItemModalOpen, ModalActionT } from "@store/modal/ModalActions";
import { FolderModelI, ItemModelI } from "@common/Models"

interface PropsI {
    searchResults: {
        folders: FolderModelI[] | null,
        items: ItemModelI[] | null
    }
}

const SearchResultsList = (props: PropsI) => {
    const { searchResults } = props
    const dispatch: Dispatch<FolderActionT | ItemActionT | ModalActionT> = useDispatch();
    const { isFolderModalOpen, isItemModalOpen } = useSelector((state: RootState) => state.modalState);
    const [itemResultsEmpty, setItemResultsEmpty] = useState(true)

    useEffect(() => {
        searchResults.items && searchResults.items.length > 0 ?
            setItemResultsEmpty(false) : setItemResultsEmpty(true)

    }, [searchResults])

    const handleItemClick = (itemId: string) => {
        dispatch(setSelectedItemId(itemId))
        dispatch(setIsItemModalOpen(true))
    }

    return (
        <div className="search-results-list">
            {searchResults.folders !== null && searchResults.items !== null &&
                <>
                    <FolderResults results={searchResults.folders} />
                    <div className="item-results">
                        Item results:
                        {itemResultsEmpty ? (
                            <div className="empty-search">[None]</div>
                        ) : (
                            <ul>
                                {searchResults.items.map((elem) => (
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
                    {isFolderModalOpen &&
                        <FolderModal />
                    }
                    {isItemModalOpen &&
                        <ItemModal />
                    }
                </>
            }
        </div>
    )
}
export default SearchResultsList
