import { useState } from "react";

import "@scss/pages/SearchPage.scss"
import { FolderModelI, ItemModelI } from "@common/Models"
import SearchFetchData from "@components/searchPage/SearchFetchData"
import SearchResultsList from "@components/searchPage/SearchResultsList"

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState<{
        foldersData: FolderModelI[] | null,
        itemsData: ItemModelI[] | null
    }>({
        foldersData: null,
        itemsData: null
    });

    const handleDataReceived = ({ folders, items }: { folders: FolderModelI[], items: ItemModelI[] }) => {
        setSearchResults({ foldersData: folders, itemsData: items });
    };

    return (
        <main className="search-page">
            <SearchFetchData onDataReceived={handleDataReceived} />
            <SearchResultsList searchResults={searchResults} />
        </main>
    );

}

export default SearchPage;
