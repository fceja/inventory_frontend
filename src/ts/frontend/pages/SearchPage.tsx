import { useEffect, useState } from "react";

import "@scss/pages/SearchPage.scss"
import SearchApi from "@api/SearchApi";
import SearchForm, { FormDataT } from "@components/searchPage/SearchForm"
import SearchResultsList from "@components/searchPage/SearchResultsList"

const SearchPage = () => {
    const [responseData, setResponseData] = useState(null)
    const [queryParams, setQueryParams] = useState<FormDataT>({
        query: "",
        includeFolders: true,
        includeItems: true
    })

    /* retrieve auto complete data from api */
    useEffect(() => {
        if (queryParams.query) {
            const fetchData = async () => {
                const response = await SearchApi().getAutoCompleteData(
                    queryParams.query,
                    queryParams.includeFolders,
                    queryParams.includeItems
                );
                if (response && response.status === 200 && response.data.success) {
                    setResponseData(response.data.results)
                }
            }
            fetchData();
        }

    }, [queryParams.query])

    /* set form data from SearchForm component callback */
    const handleFormData = (searchQueryParams: FormDataT) => {
        setQueryParams(searchQueryParams)
    }

    return (
        <main className="search-page">
            <SearchForm onFormSubmit={handleFormData} />
            {responseData && <SearchResultsList searchResults={responseData} />}
        </main>
    );
}

export default SearchPage;
