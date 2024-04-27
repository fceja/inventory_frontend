import axios, { CancelTokenSource } from 'axios';

import useApiClient from "@api/config/AxiosConfig";

const SearchApi = () => {
    const apiClient = useApiClient();
    let cancelTokenSource: CancelTokenSource | null = null;

    const getAutoCompleteData = async (searchTerm: string, includeFolders: boolean, includeItems: boolean) => {
        // cancel previous request if exists
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }

        // create cancel token for the current request
        cancelTokenSource = axios.CancelToken.source();

        let queryParams: string

        if (includeFolders && includeItems) {
            queryParams = `folderName=${searchTerm}&itemName=${searchTerm}`;
        } else if (includeFolders) {
            queryParams = `folderName=${searchTerm}`;
        } else if (includeItems) {
            queryParams = `itemName=${searchTerm}`;
        } else {
            throw new Error('Expected includeFolders or includeItems');
        }

        return await apiClient.request({
            url: `/search/autocomplete?${queryParams}`,
            method: "GET",
            data: null,
            cancelToken: cancelTokenSource.token
        });
    };

    return { getAutoCompleteData };
}

export default SearchApi;
