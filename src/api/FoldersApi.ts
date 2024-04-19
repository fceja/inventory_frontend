import useApiClient from "@api/config/AxiosConfig";
import { defineCancelApiObject } from "@utils/api/AxiosUtils";

const FoldersApi = (dispatch: any, authState: any) => {
    const apiClient = useApiClient(dispatch, authState);
    const cancelApiObject = defineCancelApiObject(FoldersApi)

    const get = async (folderId: string, cancel = false) => {
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

    return { get }
}

export default FoldersApi;