import { useSelector } from 'react-redux';

import "@scss/components/searchPage/SearchResultsList.scss"
import { RootState } from "@store/ConfigureStore";
import FolderModal from "@components/_modals/folder/FolderModal"
import FolderResults from "@components/searchPage/FolderResults"
import ItemModal from "@components/_modals/item/ItemModal"
import ItemResults from "@components/searchPage/ItemResults"
import { FolderModelI, ItemModelI } from "@common/Models"

interface SearchResultsListI {
    searchResults: {
        folders: FolderModelI[] | null,
        items: ItemModelI[] | null
    }
}

const SearchResultsList: React.FC<SearchResultsListI> = (props) => {
    const { searchResults } = props
    const { isFolderModalOpen, isItemModalOpen } = useSelector((state: RootState) => state.modalState);

    return (
        <div className="search-results-list">
            {searchResults.folders !== null && searchResults.items !== null &&
                <>
                    <FolderResults results={searchResults.folders} />
                    {isFolderModalOpen &&
                        <FolderModal />
                    }
                    <ItemResults results={searchResults.items} />
                    {isItemModalOpen &&
                        <ItemModal />
                    }
                </>
            }
        </div>
    )
}
export default SearchResultsList
