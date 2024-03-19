import { apiClient } from "./config/AxiosConfig";
import { defineCancelApiObject } from "./utils/AxiosUtils";

interface ProductI {
  name: string;
  quantity: number;
}

export const ProductsApi = {
  create: async (product: ProductI, cancel = false) => {
    const cancelSignal =
      cancel && cancelApiObject
        ? cancelApiObject[ProductsApi.create.name].handleRequestCancellation()
            .signal
        : undefined;

    return await apiClient.request({
      url: "/products",
      method: "POST",
      data: product,
      signal: cancelSignal,
    });
  },
};

const cancelApiObject = defineCancelApiObject(ProductsApi);
