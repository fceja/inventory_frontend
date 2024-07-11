import useApiClient from "@api/config/AxiosConfig";

const FoldersApi = () => {
    const apiClient = useApiClient();

    const getAggregatedDataByFolderId = async (folderId: number) => {

        return await apiClient.request({
            url: `/folders/${folderId}/aggregatedData`,
            method: "GET",
            data: null,
        })
    };

    const getByFolderId = async (folderId: number) => {

        return await apiClient.request({
            url: `/folders/${folderId}`,
            method: "GET",
            data: null,
        })
    };

    return { getByFolderId, getAggregatedDataByFolderId }
}

export default FoldersApi;