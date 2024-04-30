import useApiClient from "@api/config/AxiosConfig";
import { defineCancelApiObject } from "@api/utils/AxiosUtils";

export interface ItemsModelI {
    createdAt?: Date;
    cost?: number | null;
    itemId?: number;
    minLevel?: number | null;
    name?: string;
    nodeType: string;
    parentFolderId?: number | null;
    price?: number | null;
    quantity?: number | null;
    updatedAt?: Date;
    value?: number | null;
}

const ItemsApi = () => {
    const apiClient = useApiClient();
    const cancelApiObject = defineCancelApiObject(ItemsApi)

    // CREATE operations
    const createItem = async (itemData: ItemsModelI, cancel = false) => {
        const cancelSignal =
            cancel && cancelApiObject
                ? cancelApiObject.create.handleRequestCancellation().signal
                : undefined;

        return await apiClient.request({
            url: "/items",
            method: "POST",
            data: itemData,
            signal: cancelSignal,
        });
    };

    // READ operations
    const getItemByItemId = async (itemId: string, cancel = false) => {
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

    return { createItem, getItemByItemId }
}

export default ItemsApi;