import useApiClient from "@api/config/AxiosConfig";
import { defineCancelApiObject } from "@api/utils/AxiosUtils";

const FoldersApi = () => {
    const apiClient = useApiClient();
    const cancelApiObject = defineCancelApiObject(FoldersApi)

    const getAggregatedDataByFolderId = async (folderId: number, cancel = false) => {
        const cancelSignal =
            cancel && cancelApiObject
                ? cancelApiObject.get.handleRequestCancellation().signal
                : undefined;

        return await apiClient.request({
            url: `/folders/${folderId}/aggregatedData`,
            method: "GET",
            data: null,
            signal: cancelSignal
        })
    };

    const getByFolderId = async (folderId: number, cancel = false) => {
        const cancelSignal =
            cancel && cancelApiObject
                ? cancelApiObject.get.handleRequestCancellation().signal
                : undefined;

        return await apiClient.request({
            url: `/folders/${folderId}`,
            method: "GET",
            data: null,
            signal: cancelSignal
        })
    };

    return { getByFolderId, getAggregatedDataByFolderId }
}

export default FoldersApi;