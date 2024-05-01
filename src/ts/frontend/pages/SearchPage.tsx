import { useState } from "react";

import "@scss/pages/SearchPage.scss"
import { FolderModelI, ItemModelI } from "@common/Models"
import SearchFetchData from "@components/search/SearchFetchData"
import SearchResultsList from "@components/search/SearchResultsList"

const SearchPage = () => {
    const [searchResults, setSearchResults] =
        useState<{
            foldersData: FolderModelI[] | null,
            itemsData: ItemModelI[] | null
        }>(
            { foldersData: null, itemsData: null }
        );

    const handleDataReceived = (data: { folders: FolderModelI[], items: ItemModelI[] }) => {
        setSearchResults({ foldersData: data.folders, itemsData: data.items });
    };

    return (
        <div className="search-page">
            <SearchFetchData onDataReceived={handleDataReceived} />
            <SearchResultsList searchResults={searchResults} />
        </div>
    );

}

export default SearchPage;
