import useApiClient from "@api/config/AxiosConfig";
import { defineCancelApiObject } from "@utils/api/AxiosUtils";

const ItemsApi = (dispatch: any, authState: any) => {
    const apiClient = useApiClient(dispatch, authState);
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