import useApiClient from "@api/config/AxiosConfig";
import { defineCancelApiObject } from "@api/utils/AxiosUtils";

const ItemsApi = () => {
    const apiClient = useApiClient();
    const cancelApiObject = defineCancelApiObject(ItemsApi)

    const getById = async (itemId: string, cancel = false) => {
        const cancelSignal =
            cancel && cancelApiObject
                ? cancelApiObject.get.handleRequestCancellation().signal
                : undefined;

        return await apiClient.request({
            url: `/items/${itemId}`,
            method: "GET",
            data: null,
            signal: cancelSignal
        })
    };


    return { getById }
}

export default ItemsApi;