import { useEffect, useState } from "react";

import "@scss/pages/SearchPage.scss"
import SearchApi from "@api/SearchApi";
import SearchForm, { SearchFormT } from "@components/searchPage/SearchForm"
import SearchResultsList from "@components/searchPage/SearchResultsList"

const SearchPage = () => {
    const [searchResults, setSearchResultsData] = useState(null)
    const [searchQueryParams, setSearchQueryParams] = useState<SearchFormT>({
        searchQuery: "",
        includeFolders: true,
        includeItems: true
    })

    /* retrieve auto complete data from api */
    useEffect(() => {
        if (searchQueryParams.searchQuery) {
            const fetchData = async () => {
                const response = await SearchApi().getAutoCompleteData(
                    searchQueryParams.searchQuery,
                    searchQueryParams.includeFolders,
                    searchQueryParams.includeItems
                );
                if (response && response.status === 200 && response.data.success) {
                    setSearchResultsData(response.data.results)
                }
            }
            fetchData();
        }

    }, [searchQueryParams.searchQuery])

    /* callback that sets search query from SearchForm component*/
    const handleSearchFormSubmit = (searchQueryParams: SearchFormT) => {
        setSearchQueryParams(searchQueryParams)
    }

    return (
        <main className="search-page">
            <SearchForm onFormSubmit={handleSearchFormSubmit} />
            {searchResults && <SearchResultsList searchResults={searchResults} />}
        </main>
    );
}

export default SearchPage;
