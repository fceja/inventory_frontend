import useApiClient from "@api/config/AxiosConfig";

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

    // CREATE operations
    const createItem = async (itemData: ItemsModelI) => {

        return await apiClient.request({
            url: "/items",
            method: "POST",
            data: itemData,
        });
    };

    // DELETE operations
    const deleteItemByItemId = async (itemId: number) => {

        return await apiClient.request({
            url: `/items/${itemId}`,
            method: "DELETE",
            data: itemId,
        });
    };

    // READ operations
    const getItemByItemId = async (itemId: string) => {

        return await apiClient.request({
            url: `/items/${itemId}`,
            method: "GET",
            data: null,
        })
    };

    return { createItem, deleteItemByItemId, getItemByItemId }
}

export default ItemsApi;